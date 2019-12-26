import '../../node_modules/chartist/dist/chartist.min.css'
import React from 'react';
import '../index.css';
import { connect } from 'react-redux';
import SessionInfo from '../components/sessionInfo.js'
import JournalForm from './journalForm.js'

// 'state' is actually *redux store*,
// which is I guess a 'state', but obvs *not*
// plain old react state.  
function mapStateToProps(state) {
  return {
    entries: state.journal.entries
  };
}

class JournalRow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      infoShown:  false,
      showForm: this.props.showForm
    }
  }
  
  showInfo = () => {
    this.setState({infoShown: !this.state.infoShown})
  }

  toggleForm = () => {
    this.setState({showForm: !this.state.showForm})
  }
  deleteEntry = () => (this.props.dispatch({
    type: 'DELETE_ENTRY',
    payload: {id: this.props.id}
  }))
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
          <button className ="button xerror"
                  onClick={this.deleteEntry}>
            Delete Entry (Danger!)
          </button>          
        </div>
        <div className="journal-field">{this.props.spot}</div>
        <div className="journal-field">{this.props.date}</div>
        <div className="journal-field">{this.props.entry}</div>
      </div>
        {this.state.showForm && <JournalForm id={this.props.id}
                                             spot={this.props.spot}
                                             entry={this.props.entry}
                                             date={this.props.date}
                                             submit="update"/>}
      <SessionInfo forceHidden={!this.state.infoShown} className={this.state.infoShown ? "active" : "hidden"} spot={this.props.spot} date={this.props.date}/>
      </div>
    )
  }
}

export default connect(mapStateToProps)(JournalRow)
