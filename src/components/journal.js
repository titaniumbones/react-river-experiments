import '../../node_modules/chartist/dist/chartist.min.css'
import React from 'react';
import '../index.css';
import moment from 'moment'
import { connect } from 'react-redux';
import JournalForm from './journalForm.js'
import JournalRow from './journalRow.js'
import JournalFilter from './journalFilter.js'
import  {journalRef,} from '../firebase'
import {compareJournals} from '../utils/utils.js'
import {mapJournalToProps as mapStateToProps} from '../utils/stateMaps.js'
import store from '../store.js'
import { filterEntries} from '../utils/filters.jsx'
import MomentUtils from '@date-io/moment';
import SessionTimePicker from './picker.jsx'
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

export class Journal extends React.Component {
  
  constructor(props) {
    super(props)
    this.props.uid && journalRef
      .child(this.props.uid)
      .on('value', (snapshot) => {
        compareJournals(store.getState().journal, snapshot.val())
      })
  }

  render() {
   
    // console.log("rendering main journal")
    // console.log('MAINJOURNALENTRIES', this.props.entries)
    
    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <SessionTimePicker/>
      <div className="journal">
        <JournalForm submit="add"/>
        <JournalFilter/>
        <JournalAllEntries
          filters={this.props.filters}
          uid={this.props.uid}
          entries={this.props.entries}/>
      </div>
      </MuiPickersUtilsProvider>

    )
  }
}

class JournalAllEntries extends React.Component {

  componentDidMount = () => {

  }
  render() {
    // console.log("rerendering entries")
    // console.log('ALLENTRIES', this.props.entries)
    if (this.props.entries && this.props.entries.length > 0){
      const visibleEntries = this.props.filters ?
            filterEntries(this.props.filters, this.props.entries) :
            this.props.entries
      // console.log('ALLENTRIESFILTERED', this.props.filters,visibleEntries)
      return (
      
        <div className="journal-entries">
          {/* <JournalRow spot="MEMEM" date="DATEDATE" entry="whatevs"/> */}
          {visibleEntries.sort((a,b) => {
            return (moment(a.date).valueOf() > moment(b.date).valueOf()) ?
              -1 : 1
          })
           .map( (dataObj, index) =>
             <JournalRow key={dataObj.id} id={dataObj.id} spot={dataObj.spot}
                         date={dataObj.date} entry={dataObj.entry} rating={dataObj.rating}
                         showForm={false}/> )}
          {/* {this.props.entries.forEach( (entry, index) => console.log('MAPPINGENTRIES',entry, index))} */}
        </div>
      
      )
    }
    return null
  }
}


// const JournalAllEntries = connect(mapStateToProps)(JournalAllEntriesBase)


export default connect(mapStateToProps)(Journal)
