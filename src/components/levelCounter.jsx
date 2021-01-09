import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
//import ChartistGraph from '../../node_modules/react-chartist/index.js';
import moment from 'moment'
import {testGood} from '../DataParsers.js'
import {upperCredit, irvine} from '../rivers.js'


function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
export function Counter (props) {
  let newClass
  switch (props.rating) {
  case "bad": newClass="error"; break;
  case "good": newClass="success"; break;
  case "shoulder": newClass="secondary"
  }
  return (
    <button className={'button ' + newClass}>
      {props.name}: {props.level} as of {moment(props.time).format('HH:mm')}
    </button>
  )

}

function processCurrentData (url) {
  return fetch(url)
    .then( response => response.json())
    .then( json => {
      console.log('CURRENTDATA', json[0]);
      const d = json[0].data[0]
      return {time: d[0], level:d[1]}})
}


export default function  LevelCounters (props) {
  const [irv, setIrvine] = useState({})
  const [credit, setCredit] = useState({})
  // const [spencertown, setSpencertown] = useState({})
  const cUrl = `https://waterinfo.cvc.ca/KiWIS/KiWIS?service=kisters&type=queryServices&&request=getTimeseriesValues&datasource=0&format=json&ts_id=14522010&dateformat=UNIX`
  const iUrl = `https://waterdata.grandriver.ca/KiWIS/KiWIS?service=kisters&type=queryServices&request=getTimeseriesValues&datasource=0&format=dajson&ts_id=8773042&dateformat=UNIX`
  //const sUrl = `https://waterinfo.cvc.ca/KiWIS/KiWIS?service=kisters&type=queryServices&&request=getTimeseriesValues&datasource=0&format=json&ts_id=14522010&dateformat=UNIX`

  function updateData () {
    processCurrentData (cUrl)
      .then( newData => setCredit(newData))
    processCurrentData (iUrl)
      .then( newData => setIrvine(newData))
  }

  
  useInterval( () => {
    updateData()
  }, 210000)

  return (
    <div class="all-counters">
      <Counter name="Irvine"
               level={Math.round(Number(irv.level))}
               time={irv.time}
               rating={testGood(irv.level, irvine)}/>
      <Counter name="Credit" level={credit.level}
               time={credit.time}
               rating={testGood(credit.level, upperCredit)}/>
      {/* <Counter name="Spencer, Town Section" level={spencertown.level} */}
      {/*          time={spencertown.time} */}
      {/*          rating={testGood(spencertown.level, upperCredit)}/> */}
      
      <button className = "button success" onClick={updateData}>Update</button>
    </div>
  )

}
