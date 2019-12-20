import '../node_modules/chartist/dist/chartist.min.css'
import moment from 'moment';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Rivers from  './rivers.js';
import {processGauge, getWOJSON} from './DataParsers.js'
// import App from './App';
import * as serviceWorker from './serviceWorker';
import Waterchart from './components/waterchart.js'
import ChartistGraph from 'react-chartist';
import Line from './components/chartist-components.js'
import RechartWaterChart from './components/rechart-components.js'
import WaterTabs from './components/watertabs.js'
import {Point, PointList, MarkdownFromUrl, RiverTabPanel} from './components/watertabs.js'
import Journal from './components/journal.js'
const Chartist = require('chartist')
const spots = Rivers;


function App(props) {
  const points={ 
    "putin": [43.702321,-80.445578] ,
    "takeout": [43.662701, -80.453265] 
  }
  return (
    <div>
      <h1>S.O. Shreds</h1>
      <WaterTabs rivers={Rivers}/>
      {/* <MarkdownFromUrl url='./test.md'/> */}
      {/* <PointList points={points}/> */}
      <Journal rivers={Rivers}/>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root'))
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
