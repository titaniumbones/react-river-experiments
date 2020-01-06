import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v4'
import Rivers from  '../rivers.js';
import Breaks from '../surfspots.js'

// import {addJournalEntry} from '../actions/main.js'
import firebase from '../firebase.js'
import moment from 'moment'
import {mapJournalToProps as mapStateToProps} from '../utils/stateMaps.js'
import StarRating from './star-rating.jsx'


export class SelectSpot extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      // spot: this.props.spot || (this.props.allowNull && 'none')
    }
  }
  handleChange = (event) => {
    const target = event.target;
    const value = target.type ==='checkbox' ? target.checked : target.value;
    const name = target.name;
    
    this.setState({[name]: value})    
  }
  render () {
    return (
      <label>
        Spot:
        <select name="spot" value={this.props.current || this.state.spot } onChange={this.props.onChange}>
          {this.props.allowNull &&
           <optgroup label="Clear"><option key="none" value="none">No spot</option></optgroup>}
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
    )
  }
}

export class JournalForm extends React.Component {
  constructor(props) {
    super(props)
    const {spot, date, entry, id, rating} = this.props
    this.state = {
      spot: spot || "grand",
      date: date || moment().format('YYYY-MM-DD'),
      entry: entry,
      rating: rating,
      id : id || uuid()
    }
  }
  handleSubmit = (entry) => {
    // const uid = this.props.uid || 'anonymous'
    // console.log('FORMUPDATE', entry);
    this.props.dispatch({type: (this.props.submit === "update") ?
                         'UPDATE_ENTRY' : 'ADD_ENTRY',
                         payload: entry})
      
    this.props.uid && firebase.database()
      .ref(`journal/${this.props.uid}/${entry.id}`)
      .set({
        spot: entry.spot,
        date: entry.date,
        entry: entry.entry,
        rating: entry.rating,
        updated: entry.updated
      })
  }  

  handleChange = (event) => {
    const target = event.target;
    const value = target.type ==='checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({[name]: value})    
  }

  onSubmit = (event) => {
    const {spot, date,entry,id, rating} = this.state;
    const info = {
      spot: spot,
      date: date,
      entry: entry,
      id: id,
      rating: rating,
      updated: Date.now()
    };
    event.preventDefault();
    this.handleSubmit(info)
    this.setState({entry: ''})
  }

  setRating = rating => {
    console.log('SETRATING', typeof (rating))
    rating= Number(rating)
    this.setState({ rating: rating });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
      <fieldset>
        <SelectSpot onChange={this.handleChange} current={this.state.spot}/>
        <label >
          date:
          <input name="date" type="text" value={this.state.date} onChange={this.handleChange}/>
        </label>
        <label>
          Quality:
          <StarRating
            numberOfStars="5"
            currentRating={this.props.rating || 0 }
            onClick={this.setRating}
          />
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
