var pg = require('pg');


module.exports =  function(cber){

  this.beeper = 'hoo ha'


  var conny = pg.connect(process.env.DATABASE_URL, function(err, client, done){

   client.query("SELECT * FROM calower", function(err, res){
     done();
      if(err){
        console.log(err);
        return err;
      }

      toex = res.rows;
      console.log('shoulda called back!')
// doesn't work here      return toex
    cber(err,res);
      console.log("in the res" + res);
    })
    .on('end', function(){
      console.log('it over');
      return toex
    })
  })


return conny}
