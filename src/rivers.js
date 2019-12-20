const streetsville = {
  "name": "Credit River at Streetsville",
  "slug": "lowercredit",
  "gaugeType": "wateroffice",
  "gaugeID": "02HB029",
  "units": "cms",
  "lat":123.456,
  "long": -456.789,
  "levels": [[0,4.6,"bad"], [4.6,8,"shoulder"], [8,50,"good"],[50,100,"shoulder"]],
  "qualityPeaks": [ [0,"bad"], [85, "good"], [170, "bad"], [290, "bad"] ],
  "minHeight": 4.6
},
      // irvine =   {
      //   "name": "Irvine",
      //   "gaugeType": "wateroffice",
      //   "gaugeID": "02GA005",
      //   "slug": "irvine",
      //   "units": "cms",
      //   "points":{ 
      //     "putin": [43.702321,-80.445578] ,
      //     "takeout": [43.662701, -80.453265] 
      //   },
      //   "levels": [[0,4.6,"bad"], [4.6,8,"shoulder"], [8,50,"good"],[50,100,"shoulder"]],
      //   "qualityPeaks": [ [0,"bad"], [85, "good"], [170, "bad"], [290, "bad"] ],
      //   "minHeight": 4.6
      // },
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
        "qualityPeaks": [ [0,"bad"], [85, "good"], [170, "bad"], [290, "bad"] ],
        "minHeight": 4.6
      },

      elora = {
        name: "Elora Gorge at Shand Dam",
        gaugeType: "grca",
        gaugeID: 'Shand Dam Discharge',
        "units": "cms",
        slug: "grand",
        points: {
          putin: [43.4379897,-80.2842689],
          takeout:[43.662701, -80.453265]
        },
        minHeight: 5,
        levels: [[0,4.6,"bad"], [4.6,8,"shoulder"], [8,50,"good"],[50,100,"shoulder"]],
      },
      upperCredit = {
        name: "Upper Credit River at Belfountain",
        gaugeType: "cvc",
        gaugeID: '14522010',
        "units": "cms",
        slug: "uppercredit",
        points: {},
        minHeight: 0.75,
        levels: [[0,0.75,"bad"], [0.75, 0.78,"shoulder"], [0.78, 1.1,"good"],[1.1,100,"shoulder"]],
      },
      rivers =[elora, streetsville, upperCredit, irvine];


const cors = `https://hackinghistory.ca:9090/`, // `https://cors-anywhere.herokuapp.com/`
      Rivers =[elora, streetsville, upperCredit, irvine];

export {streetsville as lowercredit}
export default Rivers;
