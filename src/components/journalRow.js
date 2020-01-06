import '../../node_modules/chartist/dist/chartist.min.css'
import React from 'react';
import '../index.css';
import { connect } from 'react-redux';
import SessionInfo from '../components/sessionInfo.js'
import JournalForm from './journalForm.js'
import firebase from '../firebase.js'
import {Resizable, ResizableBox} from 'react-resizable'
import {mapUserToProps as mapStateToProps} from '../utils/stateMaps.js'
import StarRating from './star-rating.jsx'
import {getSpot} from '../utils/utils.js'


class JournalRow extends React.Component {
  constructor(props) {
    super(props)
    const name = getSpot(this.props.spot)
    this.state = {
      infoShown:  false,
      showForm: this.props.showForm,
      name: name.name
    }
  }
  
  showInfo = () => {
    this.setState({infoShown: !this.state.infoShown})
  }

  toggleForm = () => {
    this.setState({showForm: !this.state.showForm})
  }
  deleteEntry = () => {
    firebase.database().ref(`journal/${this.props.uid}/${this.props.id}`).remove()
    this.props.dispatch({
      type: 'DELETE_ENTRY',
      payload: {id: this.props.id}
    })}
  render() {
    return (
      <div className="journal-row">
      <div className ="entry">
        <div className="buttons">
          <button className ="button success"
                  onClick={this.showInfo}>
            {this.state.infoShown ?
             `Hide Graphs` : `Show Graphs`}
          </button>
          <button className ="secondary"
                  onClick={this.toggleForm}>
      {this.state.showForm ?
       `Hide Update Form` : `Update Entry` }
          </button>          
          <button className ="button error"
                  onClick={this.deleteEntry}>
            Delete Entry (Danger!)
          </button>          
        </div>
        <div className="spoot-field">{this.props.spot}</div>
        <div className="date-field">{this.props.date}</div>
        <div className="journal-field">{this.props.entry}</div>
      </div>
        {this.state.showForm &&
         <Resizable>
         <JournalForm id={this.props.id}
                      spot={this.props.spot}
                      entry={this.props.entry}
                      date={this.props.date}
         submit="update"/>
         </Resizable>}
      <SessionInfo forceHidden={!this.state.infoShown} className={this.state.infoShown ? "active" : "hidden"} spot={this.props.spot} date={this.props.date}/>
      </div>
    )
  }
}

export default connect(mapStateToProps)(JournalRow)
