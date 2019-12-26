import '../../node_modules/chartist/dist/chartist.min.css'
import React from 'react';
import '../index.css';
import { connect } from 'react-redux';
import SessionInfo from '../components/sessionInfo.js'
import JournalForm from './journalForm.js'
import JournalRow from './journalRow.js'

// 'state' is actually *redux store*,
// which is I guess a 'state', but obvs *not*
// plain old react state.  
function mapStateToProps(state) {
  return {
    entries: state.journal.entries
  };
}

export class Journal extends React.Component {

   render() {
    console.log("rendering main journal")
    console.log(this.props.entries)
    return (
      <div className="journal">
        <JournalForm submit="add"/>
        {this.props.entries && <JournalAllEntries entries={this.props.entries}/>}
      </div>
    )
  }
}


class JournalAllEntries extends React.Component {
  
  render() {
    console.log("rerendering entries")
    console.log('ALLENTRIES', this.props.entries)
    return (
      <div className="journal-entries">
        {/* <JournalRow spot="MEMEM" date="DATEDATE" entry="whatevs"/> */}
        {this.props.entries.map( (dataObj, index) =>
          <JournalRow key={dataObj.id} id={dataObj.id} spot={dataObj.spot}
                      date={dataObj.date} entry={dataObj.entry}
                      showForm={false}/> )}
        {this.props.entries.forEach( (entry, index) => console.log(entry, index))}
      </div>
    )
  }
}






export default connect(mapStateToProps)(Journal)
