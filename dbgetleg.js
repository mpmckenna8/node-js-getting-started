var pg = require('pg');
var qs = require('querystring');
var legis = require('./getLeg.js');

var send = true;


module.exports =  function(cber, queryS){

  var quobs = qs.parse(queryS);

  var table = quobs.state + quobs.house;


  pg.connect(process.env.DATABASE_URL, function(err, client, done){



   client.query("SELECT * FROM " + table, function(err, res){
     console.log('tried a query');
     var send = true;

    done();
      if(err){
        console.log('and an err', err);
        legis(quobs.state, quobs.house, function(datey){
          console.log('Shouldacalled back after sun run')
          cber(err, datey);
          send = false;
        //  done();
        });
        //return err;
      }

      toex = res;
      console.log('shoulda called back!')
// doesn't work here      return toex


      console.log("in the res" + res);
    })
    .on('end', function(){
      console.log('it over');
      if(send){
        cber(err,toex.rows);
      }
    })
  })

};
