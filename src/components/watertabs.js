import React, { Component } from 'react'
import Markdown from 'markdown-to-jsx'
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

export class MarkdownFromUrl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content : '',
    }
  }
  componentDidMount = () => {
    const errText = '## No River Info Available'
    fetch(this.props.url)
      .then( (res) => res.text())
      .then( (text) => (text.length > 0 && text.substring(0,15) != '<!DOCTYPE html>') ?
             this.setState({content: text}) && console.log("MARKDOWN", text) :
             this.setState({content:errText}) )
      .catch (() => (err) => this.setState({content:errText + err}))
  }
  
  render() {
    return (
      <Markdown>
        {this.state.content}
      </Markdown>)
  }
}


export class PointList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <div>
      <h2 value="Map Links">Map Links</h2>
      <ul>
      {this.props.points.length > 0 ?
       Object.entries(this.props.points).map(point => {
          if (point[0]) return <Point name={point[0]} location={point[1]}/>
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
        {this.state.points && <PointList points={this.state.points}/>}
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
