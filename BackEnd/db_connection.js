var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    database : "canvas",
    user: "root",
    password: "root"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

module.exports.con=con;