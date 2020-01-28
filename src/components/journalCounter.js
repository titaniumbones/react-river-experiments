import '../../node_modules/chartist/dist/chartist.min.css'
import React, {useState} from 'react';
// import '../index.css';
import './css/journal-counter.css'
import {userSelector, journalSelector } from '../utils/stateMaps.js'
import SessionInfo from '../components/sessionInfo.js'
import JournalForm from './journalForm.js'
import firebase from '../firebase.js'
import StarRating from './star-rating.jsx'
import {getSpot} from '../utils/utils.js'
import Markdown from 'markdown-to-jsx'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'

export default function JournalCounter(props)  {
  // const [numEntries, setNumEntries] = useState(0);
  //const [showForm, setShowForm] = useState(props.showForm);
  //const uid = useSelector( userSelector)
  const journal = useSelector (journalSelector)
  journal.entries && journal.entries.map((e) => console.log('JOURNALCOUNTDATE', e.date))
  console.log('JOURNAL', journal)
  const startOfYear = moment().startOf('year');
  const today=moment().dayOfYear()
  const numEntries = journal.entries && journal.entries.reduce( (n, e) => n + (moment(e.date) >= startOfYear ), 0);
  console.log(numEntries);
  const projection = Math.round(numEntries * (366/today));
  const outOf = (today/numEntries ).toFixed(2)
  // const dispatch = useDispatch()
  //const name=getSpot(props.spot).name
  
  //const toggleShowForm = () => setShowForm(!showForm);
  //const toggleShowInfo = () => setShowInfo(!showInfo);
  
  // function updateStars(rating)  {
  //   rating= Number(rating)
  //   const {id, entry, spot, date } = props
  //   const updated = Date.now()
  //   dispatch({
  //     type: 'UPDATE_ENTRY',
  //     payload: {id, entry, spot, date, rating, updated: updated }})
  //   uid && firebase.database()
  //     .ref(`journal/${uid}/${id}`)
  //     .set({
  //       spot: spot,
  //       date: date,
  //       entry: entry,
  //       rating: rating,
  //       updated: updated
  //     })
  // }

  // function fetchNumEntries () {
  //   dispatch({})
  // }

  // function deleteEntry ()  {
  //   const doIt = window.confirm("Delete this item? This can't be undone.")
  //   if (doIt) {
  //     firebase.database().ref(`journal/${uid}/${props.id}`).remove()
  //     dispatch({
  //       type: 'DELETE_ENTRY',
  //       payload: {id: props.id}
  //     })}
  // }

  return (
    <div className="journal-counter">
      <p>{numEntries} journal entries to date this year.  At 1 session approximately every {outOf} days, on track for {projection} sessions this year.</p>
    </div>
  )
}

