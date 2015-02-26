var http = require('http');
var url = require('url');

var qs = require('querystring');

var addtodb = require('./legdb.js');
var fs = require('fs');

var strstate = "ca";

var house = "upper";

var active = "true";


// need to replace this with my config var SUNLIGHT

var key = process.env.SUNLIGHT;
var baseurl = "http://openstates.org/api/v1/metadata/?";

var toqs = {
  apikey: key,
//  state: strstate,
//  active: active,
  //chamber: house
}



var useurl = baseurl + qs.stringify(toqs);

var rehost = url.parse(useurl);


console.log(rehost)

var conString = '';

var req = http.request(rehost, function(res){
  console.log(res);

  res.setEncoding('utf8');
  res.on('data', function(chunky){
    console.log(typeof(chunky))
  //  console.log(chunky);
    conString += chunky;


  })

  res.on('end',todb);
}).on('error', function(e){
  console.log('big bad error ' + e.message)
})

req.end()
var who;

function todb(){

 console.log(conString);
  var fojson = JSON.parse(conString)

  var lenfoj = fojson.length;

  var fullnames = [];

  console.log('the length is ' + lenfoj);




  console.log('ending length is', fojson.length);

  //return fojson;
  // To add the object to the database uncomment next line:
  //  addtodb(fojson);
  fs.writeFile('states.json', conString, function(err){
    if (err) throw err;

    console.log('file of states should be made.')
  })



  //console.log(process.env)


}
