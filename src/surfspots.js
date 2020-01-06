const abay = {
  slug: 'abay',
  "name": "Ashbridge's Bay",
  "lat":123.456,
  "long": -456.789,
  "directions": [[0,10,"bad"], [10,30,"shoulder"], [30,150,"good"],[150,180,"shoulder"],[180,360,"bad"]],
  "qualityPeaks": [ [0,"bad"], [85, "good"], [170, "bad"], [290, "bad"] ],
  "minHeight": 0.85,
  sources: [
    {type: "glosPoint",
     sourceid: null,
     // TODO: seems like thisis part of the definition of the type
     
     //timeseries: ['wdir', 'wsp']
    },
    {type: "glosBuoy",
     sourceid: 45159,
     name: "Ajax Buoy"}
  ]
}

const oshawa = {
  slug: 'oshawedge',
  "name": "Oshawa",
  "lat":123.456,
  "long": -456.789,
  "directions": [[0,10,"bad"], [10,30,"shoulder"], [30,150,"good"],[150,180,"shoulder"],[180,360,"bad"]],
  "qualityPeaks": [ [0,"bad"], [85, "good"], [170, "bad"], [290, "bad"] ],
  "minHeight": 0.85,
  sources: [
    {type: "glosPoint",
     sourceid: null,
     // TODO: seems like thisis part of the definition of the type
     
     //timeseries: ['wdir', 'wsp']
    },
    {type: "glosBuoy",
     sourceid: 45159,
     name: "Ajax Buoy"}
  ]
}

const mavs = {
  slug: 'minimavs',
  "name": "Mini Mavs (Bluffer's Park)",
  "lat":123.456,
  "long": -456.789,
  "directions": [[0,10,"bad"], [10,30,"shoulder"], [30,150,"good"],[150,180,"shoulder"],[180,360,"bad"]],
  "qualityPeaks": [ [0,"bad"], [85, "good"], [170, "bad"], [290, "bad"] ],
  "minHeight": 0.85,
  sources: [
    {type: "glosPoint",
     sourceid: null,
     // TODO: seems like thisis part of the definition of the type
     
     //timeseries: ['wdir', 'wsp']
    },
    {type: "glosBuoy",
     sourceid: 45159,
     name: "Ajax Buoy"}
  ]
}
const Breaks =[abay, oshawa, mavs];

export default Breaks;
