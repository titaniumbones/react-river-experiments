import '../node_modules/chartist/dist/chartist.min.css'
import moment from 'moment';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './rivers.css';
import Rivers from  './rivers.js';
import {processGauge, getWOJSON} from './DataParsers.js'
// import App from './App';
import * as serviceWorker from './serviceWorker';
import Waterchart from './components/waterchart.js'
// import ChartistGraph from 'react-chartist';
// import Line from './components/chartist-components.js'
import RechartWaterChart from './components/rechart-components.js'
import WaterTabs from './components/watertabs.js'
// import {Point, PointList, MarkdownFromUrl, RiverTabPanel} from './components/watertabs.js'
import MarkdownFromUrl from './components/markdownFromUrl.js'
import Journal from './components/journal.js'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import {
  Router,
  Link
} from "@reach/router";
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const initialState = {
  journal: {
    entries: [
      {spot: 'irvine', date: 'December 10, 2019', id: 0, entry:'Moderate Level.  somewhat sticky hole at the bottom of three ledges, Mike flipped and the hole was big enough to hold a solo canoe.  Flippy hole at the river-right bottom of Triple Drop, flipped both me and Ian. River left, center both too low torun; pothole in trible drop river right clearly visible as a spouting rooster tail. Ledges clearly visible within the dam waterfall, deifnitely below a safe level for me to run.  Canyon section no harder than class II,but still continuous to the junction with the Gorge section.  Gorge fairly mellow, Chute at a good level.'}],
    current: {spot:'', date:'', entry:'' }
  }
}

const store = createStore(mainReducer);
function mainReducer(state=initialState, action) {
  // just gonna leave this blank for now
  // which is the same as `return undefined;`
  switch (action.type) {
  case 'ADD_ENTRY':
    return {...state, 
      journal : {
        entries: [action.payload, ...state.journal.entries]
      }
    }
    
  }
  return state
}


// const Chartist = require('chartist')
const spots = Rivers;


function App(props) {
  const points={ 
    "putin": [43.702321,-80.445578] ,
    "takeout": [43.662701, -80.453265] 
  }
  return (

    <Provider store={store}>
        <nav className="nav bg-light">
          <Link className="brand" to="/">S.O. Shreds</Link>
          <Link to="/rivers">Rivers: Current Levels</Link>
          <Link to="/journal">Journal</Link>
          <Link to="/about">About</Link>
        </nav>

        <Router>
          <WaterTabs path="rivers" rivers={Rivers}/>
          <Journal path="journal" rivers={Rivers}/>
          <MarkdownFromUrl path="about" url="descriptions/about.md"/>
    </Router>
    </Provider>
    // <div>
    //   <h1>S.O. Shreds</h1>
    //   <Tabs>
    //     <TabList>
    //       <Tab>Current Conditions</Tab>
    //       <Tab>Journal</Tab>
    //     </TabList>
    //     <TabPanel>
    //       <WaterTabs rivers={Rivers}/>
    //     </TabPanel>
    //     <TabPanel>
    //       <Journal rivers={Rivers}/>
    //     </TabPanel>
    //   {/* <MarkdownFromUrl url='./test.md'/> */}
    //   {/* <PointList points={points}/> */}
    
    // </Tabs>
    // </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root'))
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
