import '../../node_modules/chartist/dist/chartist.min.css'
import React, {useState} from 'react';
import '../index.css';
import {userSelector } from '../utils/stateMaps.js'
import SessionInfo from '../components/sessionInfo.js'
import JournalForm from './journalForm.js'
import firebase from '../firebase.js'
import StarRating from './star-rating.jsx'
import {getSpot} from '../utils/utils.js'
import Markdown from 'markdown-to-jsx'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'

export default function HookJournalRow(props)  {
  const [showInfo, setShowInfo] = useState(false);
  const [showForm, setShowForm] = useState(props.showForm);
  const uid = useSelector( userSelector)
  const dispatch = useDispatch()
  const name=getSpot(props.spot).name
  
  const toggleShowForm = () => setShowForm(!showForm);
  const toggleShowInfo = () => setShowInfo(!showInfo);
  
  function updateStars(rating)  {
    rating= Number(rating)
    const {id, entry, spot, date } = props
    const updated = Date.now()
    dispatch({
      type: 'UPDATE_ENTRY',
      payload: {id, entry, spot, date, rating, updated: updated }})
    uid && firebase.database()
      .ref(`journal/${uid}/${id}`)
      .set({
        spot: spot,
        date: date,
        entry: entry,
        rating: rating,
        updated: updated
      })
  }


  function deleteEntry ()  {
    const doIt = window.confirm("Delete this item? This can't be undone.")
    if (doIt) {
      firebase.database().ref(`journal/${uid}/${props.id}`).remove()
      dispatch({
        type: 'DELETE_ENTRY',
        payload: {id: props.id}
      })}
  }

  return (
    <div className="journal-row">
      <div className ="entry">
        <div className="buttons">
          <button className ="button success"
                  onClick={toggleShowInfo}>
            {showInfo ?
             `Hide Graphs` : `Show Graphs`}
          </button>
          <button className ="secondary"
                  onClick={toggleShowForm}>
            {showForm ?
             `Hide Update Form` : `Update Entry` }
          </button>          
          <button className ="button error"
                  onClick={deleteEntry}>
            Delete Entry (Danger!)
          </button>          
        </div>
        <div className="meta">
          <div className="spot-field">{name}</div>
          <div className="date-field">{moment(props.date).format('MMM DD, YYYY')}</div>
          <StarRating
            numberOfStars="5"
            currentRating={props.rating || 0 }
            onClick={updateStars}
          />
          
        </div>
        <div className="journal-field">
          <Markdown>{props.entry || ''}</Markdown>
        </div>
      </div>
      {showForm &&
       <JournalForm id={props.id}
                    spot={props.spot}
                    entry={props.entry}
                    date={props.date}
                    rating={props.rating}  
                    submit="update"
                    submitCallback={toggleShowForm}
       /> }
      <SessionInfo forceHidden={!showInfo} className={showInfo ? "active" : "hidden"} spot={props.spot} date={props.date}/>
    </div>
  )
}

