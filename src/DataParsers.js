import moment from '../node_modules/moment/moment.js'
/* 

   RIVER GAUGE DEFINITIONS

*/


// const cors = `https://hackinghistory.ca:9090/`
/* DICTIONARY mapping gauge type to function */

// I think fn symbols are hoisted so should be ok here?
const gaugeDict = {
  cvc: processWiskiData,
  grca: processWiskiData,
  wateroffice: processWOData
}

/* TESTER for all gauge types */

function testGood (level, spotMeta) {
  let value = 'bad';
  spotMeta.levels
    .some( function (d)  {
      if ( (d[0] < level) && ( level < d[1])  ) {
        // console.log(d);
        value = d[2]; return value; }
      return value
    });
  //console.log(value)
  return value
}


/*
 *
 * WISKI/KIWIS-based gauges (currently grca & cvc)
 * see notes for individual discrapncies
 * all sources so far seem to support KiWIS 1.6.1 api as outlined here:
 * https://waterdata.grandriver.ca/KiWIS/KiWIS?datasource=0&service=kisters&type=queryServices&request=getrequestinfo
 */



async function processWiskiData (spot, last) {
  // this might stop working if we get other similar data sources, may need to
  // refactor!
  // have now discovered kiwi endpoints for bot conserveration area, os
  // no longer need  so many functions, just a  baseurl switch.

  // note we are nto actually using STATION ids, but instead TIMESERIES ids
  // this can be confusing & messes w/ the data model a bit. 
  const baseURL = spot.gaugeType === 'cvc' ? `https://waterinfo.cvc.ca/` : `https://waterdata.grandriver.ca/`,
        baseParams = `KiWIS/KiWIS?service=kisters&type=queryServices&request=getTimeseriesValues&datasource=0&format=dajson`,
        id = spot.gaugeID,
        start = moment(last).subtract(4, 'days').format('YYYY-MM-DD'),
        end = moment(last).format('YYYY-MM-DD'),
        url = `${baseURL + baseParams}&ts_id=${id}&from=${start}&to=${end}&dateformat=UNIX`;
  // console.log('KIWIPROCESS', spot.gaugeType, spot, url)
  return fetch(url)
      .then ( async (res) => {
        //console.log(res.headers.get('Content-Type'))
        return res.json()
      })
    .then ( (json) => {
      // console.log('PROCESSWISKIJSON', json);
      return json[0].data
        .map( (item) => {
        let meta = {};
        meta.height = Number(item[1]);
        meta.quality = testGood(item[1], spot);
        meta.units = spot.units;
        meta.data = item;
        // note: may need to adjust date for DST & time zone -- cf.
        // functions & comments in https://apps.grandriver.ca/waterdata/kiwischarts/js/RF_Charts.js?v1.0
        // lines ~43-65
        const itemObj = {x: item[0],
                         y: item[1],
                         meta: meta
                        }
        return itemObj })    
    })
    .catch(function(error){console.log('PROCESSWISKIERR', error);})
  // console.log ("MAP")

}



// let proxy = 'https://cors-anywhere.herokuapp.com/';
async function getWOJSON (stationData, last, needCors = true) {
  // console.log('RIVER', stationData)
  let start = moment(last).subtract(4, 'days').format('YYYY-MM-DD'),
      end = moment(last).format('YYYY-MM-DD'),
      headers = {Origin: "localhost"},
      params = `?param1=47&start_date=${start}&end_date=${end}&station=${stationData["gaugeID"]}`,
      cors = `https://hackinghistory.ca:9090/`, // `https://cors-anywhere.herokuapp.com/`
      url = `https://wateroffice.ec.gc.ca/services/real_time_graph/json/inline${params}`;
  if (needCors) {url = `${cors}${url}`;}
  // console.log(url);
  // let target = `${url}${params}`;
  return await fetch(url, {headers: headers})
    .then ( async (res) => {
      // console.log(res.headers.get('Content-Type'))
      return res.json()
    })
    .then ( (json) => { console.log(json);return json["47"].provisional} )
    .catch(function(error){console.log(error);});
}


async function processWOData (spot, latest) {
  return getWOJSON(spot, latest)
    .then ( function (rawData)  {
      return rawData.map((item) => {
        let meta = {};
        meta.height = Number(item[1]);
        meta.quality = testGood(item[1], spot);
        meta.units = spot.units;
        meta.data = item;
        const itemObj =  { x: new Date(item[0]),
                           y: item[1],
                           meta: meta
                         };
        // console.log(itemObj);
        return itemObj
      })
    })
    .catch( (err) => [])
      
}

async function processGauge (spot, date, mapper=gaugeDict) {
  // console.log('PROCCESSGAUGE', spot.gaugeType, mapper[spot.gaugeType]);
  if (mapper[spot.gaugeType]) return await mapper[spot.gaugeType](spot, date);
  return
}


class DataParser {
  constructor(gaugeMap=gaugeDict){
    // this.type = type;
    this.gaugeMap=gaugeMap;
  }

  async process(spot) {
    const m=this.gaugeMap
    // console.log(spot.gaugeType, m[spot.gaugeType]);
    return await m[spot.gaugeType](spot);

  }
}

export default DataParser
export {processGauge, getWOJSON}
