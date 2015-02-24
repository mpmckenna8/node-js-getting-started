var express = require('express');
var app = express();
var cool = require("cool-ascii-faces");
var pg = require("pg");

var legis = require('./getLeg.js');

var  getleg =  require("./dbgetleg.js");


console.log("legolio")

legis();
//  var legobj = getleg(cber);

function cber (err, res){
  console.log(err);
  console.log(res);
}



app.set('port', (process.env.PORT || 5000));

// app.set('views')
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.sendFile(__dirname+"/index.html");
  console.log(process.env);
});



app.get('/db', function (request, response) {
  console.log(request);

  getleg(servit);

  function servit(err,res){
    if (err){
      console.error(err); response.send("Error " + err);
      throw err
    }
    console.log(res);
    response.send(res.rows);
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


app.get('/calAss1.json', function(req, res){
  res.sendFile(__dirname + "/calAss1.json");
})


app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
