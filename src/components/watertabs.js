import React, { Component } from 'react'
//import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'
import RiverTabPanel from './riverTabPanel.js'
import {Link, Router} from '@reach/router'


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
      return <RiverTabPanel path={r.slug} key={r.slug} river={r}/> })
    const tabMap = this.props.rivers.map( (r, index) => {
      return <Link to={r.slug} key={r.slug}>{r.name}</Link>})
    this.setState({tabList: tabMap, tabPanelArray: contentMap})
    console.log("WATERTABS PANELS", this.state.tabPanelArray)
  }

  render() {
    return (
      <>
        <nav className="nav bg-primary" defaultIndex={0} defaultFocus={true}>
          {this.state.tabList}
      </nav>
        <Router>
          {this.state.tabPanelArray}
          
        </Router>
      </>
    )
  }
  // componentDidMount = () => {
  //   console.log("WATERTABS", this.props.rivers)
  //   const contentMap = this.props.rivers.map( (r) => {
  //     return <TabPanel key={r.slug}><RiverTabPanel river={r}/></TabPanel>})
  //   const tabMap = this.props.rivers.map( (r, index) => {
  //     return <Tab key={r.slug}>{r.name}</Tab>})
  //   this.setState({tabList: tabMap, tabPanelArray: contentMap})
  //   console.log("WATERTABS PANELS", this.state.tabPanelArray)
  // }
  
  // render() {
  //   return (
  //     <Tabs defaultIndex={0} defaultFocus={true}>
  //       <TabList>
  //         {this.state.tabList}
  //       </TabList>
  //       {this.state.tabPanelArray}
  //     </Tabs>
  //   )
  // }
}
