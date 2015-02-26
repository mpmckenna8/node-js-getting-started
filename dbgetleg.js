var pg = require('pg');
var qs = require('querystring');
var legis = require('./getLeg.js');

var send = true;


module.exports =  function(cber, queryS){

  var quobs = qs.parse(queryS);

  var table = quobs.state + quobs.house;


  var conny = pg.connect(process.env.DATABASE_URL, function(err, client, done){


   client.query("SELECT * FROM " + table, function(err, res){
    // done();
      if(err){
        console.log('and an err', err);
        legis(quobs.state, quobs.house, function(datey){
          cber(err, datey);
          send = false;
        });
        return err;
      }

      toex = res.rows;
      var send = true;
      console.log('shoulda called back!')
// doesn't work here      return toex
    if(send){
     cber(err,toex);
   }

      console.log("in the res" + res);
    })
    .on('end', function(){
      console.log('it over');
    })
  })

};
