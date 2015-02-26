var pg = require('pg');

module.exports = function (bleep, table) {
  var legs = bleep
//  console.log(legs[3]);
  console.log("ehh")


  pg.connect(process.env.DATABASE_URL, function(err, client, done){

    /*
  var que =  client.query("INSERT into test_table(id,name) values(3,'happy')", function(err,res){
    if(err){
      console.log('theres been an eror');
      return err
    }

  })
  .on('end',function(res){
    console.log('ended')
    console.log(res)

  })

  */

var i = 0;

tomedb(legs);

function tomedb(legs){

  client.query("INSERT into " + table + "(id, full_name, district, party) VALUES('" +legs[i].id+"','"+legs[i].full_name +"','"+legs[i].district +"','" + legs[i].party+ "')", function(err, res){

      if(err){
        console.log(err)
        client.end();
        return err
      }


      i = i+1;
      console.log(i);


      console.log("inserting" +legs[i-1].full_name );
      console.log(res);



    }).on('end', function(res){


      if(i > legs.length -1){
        }
        if(i< legs.length)
    setTimeout(tomedb, 100, legs)
      console.log("trying to do another thing")
    })

  }

  /*

  really need to  this client.end()
  .on('error', function(e){
    console.log(e)
  });

  // to make that table:
  '
  create table calower(
  id varchar(200),
  full_name varchar(200),
  district varchar(200),
  party varchar(200),
  updated varchar(200));

  */

  ///

 })

 pg.end();

}
