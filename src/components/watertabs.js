import React, { Component } from 'react'
import MarkdownFromUrl from './markdownFromUrl.js'
import {processGauge} from '../DataParsers.js'
import Waterchart from '../components/waterchart.js'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';



export class Point extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: this.props.location
    }
  }
  render() {
    const l=this.props.location,
          url=`https://www.google.com/maps/dir/?api=1&destination=${l[0]},${l[1]}`
    return (
      <li>
        <a href={url}>{this.props.name}</a>
      </li>
    )
  }
}




export class PointList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  } 
  render() {
    const pEntries = Object.entries(this.props.points)
    return (
      <div>
      <h2 value="Map Links">Map Links</h2>
      <ul>
      {pEntries.length > 0 ?
       pEntries.map(point => {
          return <Point name={point[0]} location={point[1]}/>
       }) :
       <li>No Point Locations Provided</li>
      } 
      </ul>
      </div>
    )
  }
}

export class RiverTabPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      points: this.props.river.points,
      slug: this.props.river.slug,
      url: `./descriptions/${this.props.slug}.md`,
      latestData: null
    }
    processGauge(this.props.river)
      .then( data => this.setState({latestData: data}))
  }
  componentDidMount = () => {
 
  }
  
  render() {
    const url=`./descriptions/${this.state.slug}.md`
    return (
      <div>
        <Waterchart seriesdata={this.state.latestData}/>
        {this.props.river.points && <PointList points={this.props.river.points}/>}
        <MarkdownFromUrl url={`./descriptions/${this.state.slug}.md`}/>
        </div>
    )
  }
}

export default class WaterTabs extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tabList: [],
      tabPanelArray: []
    }
  }

  componentDidMount = () => {
    console.log("WATERTABS", this.props.rivers)
    const contentMap = this.props.rivers.map( (r) => {
      return <TabPanel><RiverTabPanel river={r}/></TabPanel>})
    const tabMap = this.props.rivers.map( (r) => {
      return <Tab>{r.name}</Tab>})
    this.setState({tabList: tabMap, tabPanelArray: contentMap})
    console.log("WATERTABS PANELS", this.state.tabPanelArray)
  }
  
  render() {
    return (
      <Tabs>
        <TabList>
          {this.state.tabList}
        </TabList>
        {this.state.tabPanelArray}
      </Tabs>
    )
  }
}
