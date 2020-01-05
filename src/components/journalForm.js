import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v4'
import Rivers from  '../rivers.js';
import Breaks from '../surfspots.js'

import {addJournalEntry} from '../actions/main.js'
import {dbRef, journalRef, chartsRef}  from '../firebase.js'
import firebase from '../firebase.js'
// 'state' is actually *redux store*,
// which is I guess a 'state', but obvs *not*
// plain old react state.  
function mapStateToProps(state) {
  return {
    entries: state.journal.entries,
    uid: state.user.user
  };
}

export class JournalForm extends React.Component {
  constructor(props) {
    super(props)
    const {spot, date, entry, id} = this.props
    this.state = {
      spot: spot || "grand",
      date: date,
      entry: entry,
      id : id || uuid()
    }
  }
  handleSubmit = (entry) => {
    const uid = this.props.uid || 'anonymous'
    console.log('FORMUPDATE', entry);
    firebase.database().ref(`journal/${this.props.uid}/${entry.id}`).set({
      spot: entry.spot,
      date: entry.date,
      entry: entry.entry
    })
    this.props.dispatch({type: (this.props.submit === "update") ?
                         'UPDATE_ENTRY' : 'ADD_ENTRY',
                         payload: entry})
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.type ==='checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({[name]: value})    
  }

  onSubmit = (event) => {
    const {spot, date,entry,id} = this.state;
    const info = {
      spot: spot,
      date: date,
      entry: entry,
      id: id 
    };
    event.preventDefault();
    this.handleSubmit(info)
    this.state.entry = this.state.date =  '';
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
      <fieldset>
        <label>
          Spot:
          <select name="spot" value={this.state.spot} onChange={this.handleChange}>
            <optgroup label="Rivers:">
      {Rivers.map( (r, index) =>
        <option key={index} value={r.slug}>{r.name}</option>
      )}
            </optgroup>
            <optgroup label="Surf Breaks">
              {Breaks.map( (r, index) =>
                <option key={index} value={r.slug}>{r.name}</option>
              )}

            </optgroup>
          </select>
        </label>
        <label >
          date:
          <input name="date" type="text" value={this.state.date} onChange={this.handleChange}/>
        </label>

      </fieldset>
        <fieldset  className="entry">
      <label for="entry">
          What Happened?:          
      </label>
          <textarea name="entry" value={this.state.entry} onChange={this.handleChange}/>
        </fieldset>
        <input className="submit" type="submit" value="Submit" tabindex="10"/>
      </form>
    );
  }
}

export default connect(mapStateToProps)(JournalForm)
