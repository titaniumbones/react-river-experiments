const streetsville = {
  "name": "Credit River at Streetsville",
  "slug": "lowercredit",
  "gaugeType": "wateroffice",
  "gaugeID": "02HB029",
  "units": "cms",
  "lat":123.456,
  "long": -456.789,
  "levels": [[0,4.6,"bad"], [4.6,8,"shoulder"], [8,50,"good"],[50,100,"shoulder"]],
  "minHeight": 4.6
},
      irvine =   {
        "name": "Irvine",
        "gaugeType": "grca",
        // "gaugeID": "Irvine R. Salem",
        gaugeID: 8773042,
        "slug": "irvine",
        "units": "cms",
        "points":{ 
          "putin": [43.702321,-80.445578] ,
          "takeout": [43.662701, -80.453265] 
        },
        "levels": [[0,4.6,"bad"], [4.6,8,"shoulder"], [8,50,"good"],[50,100,"shoulder"]],
        "minHeight": 4.6,
        sources: [
          {type: 'grca',
           timeseries: [8773042],
           units: 'cms',
           // TODO: get stationID
           // id: xxx
          },
          {type: 'wateroffice',
           timeseries: 47,
           units: 'cms',
           id: '02GA005'}
        ]
      },

      elora = {
        name: "Elora Gorge at Shand Dam",
        gaugeType: "grca",
        gaugeID: 7405042,
        //gaugeID: 11189042,
        //gaugeID: 14389,
        //gaugeID: 'Shand Dam Discharge',
        "units": "cms",
        slug: "grand",
        points: {
          putin: [43.4379897,-80.2842689],
          takeout:[43.662701, -80.453265]
        },
        minHeight: 5,
        levels: [[0,4.6,"bad"], [4.6,8,"shoulder"], [8,50,"good"],[50,100,"shoulder"]],
        sources: [{
          type: 'grca',
          timeseries: 7405042,
          units: 'cms',
          
        }]
      },
      upperCredit = {
        name: "Upper Credit River at Belfountain",
        gaugeType: "cvc",
        gaugeID: '14522010',
        "units": "cms",
        slug: "uppercredit",
        points: {
          putin: [43.7962886,-80.0139645,15],
          takeout: [43.802320,-79.993910]
        },
        minHeight: 0.75,
        levels: [[0,0.75,"bad"], [0.75, 0.78,"shoulder"], [0.78, 1.1,"good"],[1.1,100,"shoulder"]],
        sources: [{
          type: 'cvc',
          timeseries: 1452210,
          units: 'cms',
          id: null
        }]
      },
      minden = {
        name: "Gull River",
        gaugeType: null,
        gaugeID: null,
        //gaugeID: 11189042,
        //gaugeID: 14389,
        //gaugeID: 'Shand Dam Discharge',
        "units": "cms",
        slug: "minen",
        points: {
        },
        minHeight: 7.8,
        levels: [[0,7.8,"bad"], [7.8,8,"shoulder"], [8,8.4,"good"],[8.4,9,"shoulder"]],
        sources: []
      }



const Rivers =[elora, streetsville, upperCredit, irvine, minden];

export {streetsville as lowercredit}
export default Rivers;
