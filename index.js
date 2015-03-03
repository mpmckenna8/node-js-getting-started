var express = require('express');
var app = express();
var cool = require("cool-ascii-faces");
var pg = require("pg");
var url = require('url');

var legis = require('./getLeg.js');

var dbgetleg =  require("./dbgetleg.js");


console.log("legolio")
// uncomment for initial query and fill of database
// this needs values now legis();
//  var legobj = getleg(cber);

function cber (err, res){
  console.log(err);
  console.log(res);
}

console.log(process.env)

app.set('port', (process.env.PORT || 5000));

// app.set('views')
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}
  //express.static(__dirname + '/public')
  );



var howie = 'lower';

app.get('/db*', function (request, response) {

  console.log('and the request is')
    var requ = url.parse(request.url);

    console.log(requ.query)

    dbgetleg(servit, requ.query);

  function servit(err,res){

    if (err){
      console.log('error before serve db');
      console.log(res);

          response.send(res)

    }
  //  console.log(res);
  else{
    console.log('sending normal res');
     response.send(res);
   }
  }
  /*

  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM test_table', function(err, result) {
      done();
      if (err)
      { console.error(err); response.send("Error " + err); }
      else
      {
        //response.send(result.rows);
      }
    });
  });
*/
})

app.get('/states.json', function(req,res){
  res.sendFile(__dirname + '/states.json');
})

app.get('/calower.json', function(req, res){
  res.sendFile(__dirname + "/calower.json");
})

app.get('/caupper.json', function(req, res){
  res.sendFile(__dirname + "/caupper.json");
})

app.get('/map.html', function(req, res){
  res.sendFile(__dirname + "/index.html");
})

app.get('/*', function(req, res){
  res.sendFile(__dirname +"/dist/" + req.url)
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
