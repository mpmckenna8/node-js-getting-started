var http = require('http');
var url = require('url');

var qs = require('querystring');

var addtodb = require('./legdb.js');
var maketable = require('./stateTable.js')

 var strstate = "ca"; var house = "upper";

var active = "true";

var doerrcb = false;
// need to replace this with my config var SUNLIGHT

var key = process.env.SUNLIGHT;
var baseurl = "http://openstates.org/api/v1/legislators/?";

var toqs = {
  apikey: key,
  state: strstate,
  active: active,
  chamber: house
}

module.exports = function(state, house, cb){

  toqs.state = state;
  toqs.chamber = house;

var useurl = baseurl + qs.stringify(toqs);

var rehost = url.parse(useurl);


console.log(rehost)

var conString = '';

var req = http.request(rehost, function(res){
  console.log('making my req to sunny',res);


  res.setEncoding('utf8');
  res.on('data', function(chunky){
    console.log('getting data');
    console.log(typeof(chunky))
  //  console.log(chunky);
    conString += chunky;


  })

  res.on('end',todb);
}).on('error', function(e){
  console.log('big bad error ' + e.message);
  var blah = [];
  doerrcb = true;
  cb(blah)

}).end();


var who;

function todb(){

  if(doerrcb){
    console.log('too many cbs')
    cb([blah]);
  //  return [];
  }

 console.log(conString);
  var fojson = JSON.parse(conString)

  var lenfoj = fojson.length;

  var fullnames = [];

  console.log('the length is ' + lenfoj);


  fojson.forEach(function(d,i){
    console.log(i);

    if(fullnames.indexOf(d.district)>=0){

      console.log('doble alert', d.full_name, fullnames.indexOf(d.full_name) );
      fojson.splice(i,1);

    }
    else{
      fullnames.push(d.district);

    }

    //console.log("this is " + d);
    if(d.full_name.indexOf("\'")>= 0){

      d.full_name = d.full_name.replace( /\'/gi, "\'\'");
      console.log("found a baddy")
      console.log(d);

     }


  });
  var tstate = toqs.state;
  var tchamber = toqs.chamber;

  cb(fojson);

  console.log('ending length is', fojson.length);
  maketable(tstate, tchamber, function(){

    var table = toqs.state + toqs.chamber;
    addtodb(fojson, table)
  });



  return fojson;
  // To add the object to the database uncomment next line:
  //  addtodb(fojson);



  //console.log(process.env)

}



}
