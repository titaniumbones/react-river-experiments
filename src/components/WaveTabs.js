import React, { useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'
import RiverTabPanel from './riverTabPanel.js'
import Breaks from '../surfspots.js'
import {Link, Router} from '@reach/router'
export default function WaveTabs() {
  const [activeTab, updateActiveTab] = useState(0)
 
  return (
    <nav> 
      <h2>Waves Coming Soon!</h2>
      <p>Please bear with us as we try to implement wave- related functionality. </p>
      {Breaks.map( (spot) =>  <Link key={spot.slug} to={spot.slug}>{spot.name}</Link>)}
      <Router>
        <div path="abay" >empty div</div>
        
        {/* {Breaks.map(spot => <BreakTab key={spot.slug} path={spot.slug} id={spot.slug} spot={spot}/>)} */}
      </Router>
    </nav>
  )
}
class BreakTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div>
        <h2> sorry, still nothing here</h2>
      </div>
    )
  }
}

// export  class WaveTabs extends Component {
//   constructor(props) {
//     super(props)

//     this.state = {
//       tabList: [],
//       tabPanelArray: []
//     }
//   }

//   componentDidMount = () => {
//     console.log("WATERTABS", this.props.rivers)
//     const contentMap = this.props.rivers.map( (r) => {
//       return <TabPanel key={r.slug}><RiverTabPanel river={r}/></TabPanel>})
//     const tabMap = this.props.rivers.map( (r, index) => {
//       return <Tab key={r.slug}>{r.name}</Tab>})
//     this.setState({tabList: tabMap, tabPanelArray: contentMap})
//     console.log("WATERTABS PANELS", this.state.tabPanelArray)
//   }
  
//   render() {
//     return (
//       <Tabs defaultIndex={0} defaultFocus={true}>
//         <TabList>
//           {this.state.tabList}
//         </TabList>
//         {this.state.tabPanelArray}
//       </Tabs>
//     )
//   }
// }
