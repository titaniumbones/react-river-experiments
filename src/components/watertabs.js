import React, { Component } from 'react'
import MarkdownFromUrl from './markdownFromUrl.js'
import {processGauge} from '../DataParsers.js'
import Waterchart from '../components/waterchart.js'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'
import RiverTabPanel from './riverTabPanel.js'
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
