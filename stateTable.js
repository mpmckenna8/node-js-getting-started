var pg = require('pg');

var state = 'ca';
var house = 'upper';

module.exports = function(instate, chamber, cb){
  state = instate;
  house = chamber;
  console.log('trying to create db')

pg.connect(process.env.DATABASE_URL, function(err, client, done){
var statem = 'create table ' + state + house+ '(id varchar(200), full_name varchar(200), district varchar(200), party varchar(200), updated varchar(200))' ;

  client.query(statem , function(err, res){
    done();
    if(err){
      console.log(err);
      return err;
    //  cb()
    }


    toex = res.rows;
    console.log('create table shoulda called back!')
    // doesn't work here      return toex
  ///  cber(err,res);
    console.log("in the res" + res);
  })
  .on('end', function(){
  //  client.end();
    cb();
    console.log('calling shit back after making a table');
    console.log('table make over it over');
  })
})

pg.end();

}
