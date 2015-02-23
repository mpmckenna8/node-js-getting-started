var http = require('http');
var url = require('url');

var qs = require('querystring');

var addtodb = require('./legdb.js');

var strstate = "ca";

var house = "lower";

var active = "true";


// need to replace this with my config var SUNLIGHT

var key = process.env.SUNLIGHT;
var baseurl = "http://openstates.org/api/v1/legislators/?";

var toqs = {
  apikey: key,
  state: strstate,
  active: active
}

module.exports = function(){

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

//  console.log(conString);
  var fojson = JSON.parse(conString)

  fojson.forEach(function(d){
    console.log("this is " + d);
    if(d.full_name.indexOf("\'")>= 0){
      d.full_name = d.full_name.replace("\'", "\'\'");
      console.log("found a baddy")
      console.log(d);

     }
  });

  console.log(fojson.length);

  return fojson;

  // addtodb(fojson);



  //console.log(process.env)


}



}
