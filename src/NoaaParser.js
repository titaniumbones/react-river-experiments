
//var csv is the CSV file with headers
function noaaCsvToJSON(csv, h=2){
  var lines=csv.split("\n");
  var result = [];
  var headers=lines[h].split(",");
  headers = headers.map(s => s.trim());
  //console.log(headers);
  for(var i= h+1 ; i<lines.length - 1;i++) {
    let  obj = {};
    let currentline=lines[i].split(",");
    currentline=currentline.map(x => x.trim());
    //console.log(i + ": " + currentline);
    //console.log (currentline.length)
    for(var j=0;j<headers.length;j++){
      obj[headers[j]] = currentline[j].trim();
    }
    result.push(obj);
  }
  //console.log ("CSV:");
  //console.log(result);
  return result; //JavaScript object
  // return JSON.stringify(result); //JSON
}

// let proxy = 'https://cors-anywhere.herokuapp.com/';
async function getJSON (url, headline) {
    // let target = `${url}${params}`;
    return await fetch(url)
    .then(function(response){console.log(response);return response;})
    .then( (response) => {return response.text()} )
    .then( (text) =>  {return noaaCsvToJSON(text, headline)} )
    .catch(function(error){console.log(error);});
  }

function testGood (direction, spotMeta) {
  const value = 'bad';
  spotMeta.directions
    .some( function (d)  {
      if ( (d[0] < direction) && ( direction < d[1])  ) {
           // console.log(d);
        value = d[2]; return; }
    });
  //console.log(value)
  return value
}

function processNOAAData (raw,spotMeta=abay, yaxis=true) {  
  return raw.map((item) => {
    item.wvd = Number(item.wvd);
    item.direction = item.wvd ? (Number(item.wvd) + 180) % 360 : Number(item.wdir);
    //console.log(item.wvd);
    //console.log ( item.wvd ? (item.wvd + 180)  : item.wdir )
    //console.log( (item.wvd ? "WVD: " : "WDIR: " ) + ( item.wvd ?  (item.wvd + 180) % 360 : item.wdir)  );
    item.quality = testGood(item.direction);
    item.direction = Math.trunc(item.direction);
    const itemObj =  { x: new Date(item["Date String"]),
                       y: item.wvh || (item.wsp * 3.6 ),
                       // wvd: item.wvd,
                       // wdir: item.wdir,
                       // direction: (item.wvd ? ((item.wvd + 180) % 360) : item.wdir),
                       //direction: Math.trunc( (item.wvd ?  (item.wvd + 180) % 360 : item.wdir) ),
                       //meta: `<span class='arrow' style="--direction:${Math.trunc(item.wvd || item.wdir)}">&uarr;</span>`
                       meta: item
                     };
    return itemObj
  })
}

