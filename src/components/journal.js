
import '../../node_modules/chartist/dist/chartist.min.css'
import moment from 'moment';
import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import Rivers from  '../rivers.js';
import {processGauge, getWOJSON} from '../DataParsers.js'
// import App from './App';
import * as serviceWorker from '../serviceWorker';
import Waterchart from '../components/waterchart.js'
import ChartistGraph from 'react-chartist';
import Line from '../components/chartist-components.js'
import RechartWaterChart from '../components/rechart-components.js'
// import WaterTabs from '../components/watertabs.js'
import {Point, PointList, MarkdownFromUrl, RiverTabPanel} from '../components/watertabs.js'
import { connect } from 'react-redux';


const spots = Rivers;

// 'state' is actually *redux store*,
// which is I guess a 'state', but obvs *not*
// plain old react state.  
function mapStateToProps(state) {
  return {
    entries: state.journal.entries
  };
}



function getSpot (slug) {
  let value;
  console.log("GETSPOT", slug)
  for (const r of Rivers) {
    console.log('GETSPOT', r.slug, slug);
    if (r.slug === slug ) {value = r;}
  }
  return value;
}

export class Journal extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = (entry) => {
    console.log(entry);
    this.props.dispatch({type: 'ADD_ENTRY',
                         payload: entry})
  }
  
  render() {
    console.log("rendering main journal")
    console.log(this.props.entries)
    return (
      <div className="journal">
        <JournalForm handleSubmit={this.handleSubmit}/>
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
      {this.props.entries.map( (dataObj, index) => <JournalRow key={moment(dataObj.date).valueOf() + index} spot={dataObj.spot} date={dataObj.date} entry={dataObj.entry} /> )}
        {this.props.entries.forEach( (entry, index) => console.log(entry, index))}
      </div>
    )
  }
}


class JournalRow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      infoShown:  false
    }
  }
  
  showInfo = () => {
    this.setState({infoShown: !this.state.infoShown})
  }
  
  render() {
    return (
      <div className="journal-row">
        <div className ="entry">
      <button className ="spot-info" onClick={this.showInfo}>{this.state.infoShown ? `Hide Graphs` : `Show Graphs`}</button> 
          <div className="journal-field">{this.props.spot}</div>
          <div className="journal-field">{this.props.date}</div>
          <div className="journal-field">{this.props.entry}</div>
        </div>
      <SessionInfo forceHidden={!this.state.infoShown} className={this.state.infoShown ? "active" : "hidden"} spot={this.props.spot} date={this.props.date}/>
      </div>
    )
  }
}

class SessionInfo extends React.Component {
  constructor(props) {
    super(props);
    console.log('Session props', this.props)
    this.state = {
      rendeered: false,
      spotDef: getSpot(this.props.spot),
      gaugeData: null    
    }
  }
  componentDidMount() {
    console.log('ePRE Tick', this.props, this.state.spotDef);
    this.tick();
    // this.timerID = setInterval( () => this.tick(), 15000)
  }e
e
  tick() {
    console.log('TICK SPOT', this.props, this.state.spotDef);
    this.state.spotDef && processGauge(this.state.spotDef, this.props.date)
      .then (data => this.setState({rendered: true, gaugeData: data})) 
  }
  render() {
    console.log("SPOT", this.props.spot, this.state.spotDef)
    console.log('PROCESSED DATA', this.state.gaugeData)
    return (
      <div className={`${this.props.className} session-meta`}>
        {/* getSpot(this.props.spot) && Object.entries(getSpot(this.props.spot)).map( (k, v) => <li>{JSON.stringify(k)}</li>) */}
        <div className="session-data">
          <Waterchart seriesdata={this.state.gaugeData}/>
          <RechartWaterChart data={this.state.gaugeData}/>
          {/* <Line className="chart-big" type="Line" data={this.state.gaugeData}/> */}
      {/*     <ol>{this.state.gaugeData &&  Object.entries(this.state.gaugeData).map( (k,v) => <li>{JSON.stringify(k) },</li>) } */}
          {/* </ol> */}
        </div>
      </div>
    )
  }
}

class JournalForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      spot: '',
      date: '',
      entry: ''
    }
  }
  handleChange = (event) => {
    const target = event.target;
    const value = target.type ==='checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({[name]: value})    
  }

  onSubmit = (event) => {
    const s = this.state;
    const entry = {
      spot: s.spot,
      date: s.date,
      entry: s.entry
    };
    event.preventDefault();
    this.props.handleSubmit(entry);
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <label>
          Spot:
          <select name="spot" value={this.state.spot} onChange={this.handleChange}>
            {Rivers.map( (r) =>
            <option value={r.slug}>{r.name}</option>
            )}
          </select>
        </label>
        <label>
          date:
          <input name="date" type="text" value={this.state.date} onChange={this.handleChange}/>
        </label>
        <label>
          What Happened?:
          <textarea name="entry" value={this.state.entry} onChange={this.handleChange}/>
        </label>
        <input type="submit" value="Submit"/>
      </form>
    );
  }
}


export default connect(mapStateToProps)(Journal)
