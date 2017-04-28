var holder={};
mysql=require("mysql");
var juicy={host:'localhost',user:'juicy',password:'daixinyu1991',database:'juicy'};
connection=mysql.createConnection(juicy);
connection.query('select * from juicy' , function(err,rows,fields){
  if (err) throw err;
  //console.log('data here \n');
  console.log(rows[0]["type"]);
  //console.log('\n'+typeof(rows)+'\n');
  //holder=rows;
  connection.end();
  //console.log(fields);
});
//console.log('destroyed');
//connection.destroy();
