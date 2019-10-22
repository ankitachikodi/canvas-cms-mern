var db = require('./db_connection.js');
var express = require('express');
var bodyparser = require('body-parser');
var cookie = require('cookie-parser');
var session = require('express-session');
var md5 = require('md5');

//var main = require('./index.js');
//app.use(bodyParser.json());

let postRegister = (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    password = md5(password);
    var typeOfUser = req.body.type;
    var sqlResult = [];

    var verifyIfexists = "Select * from " + typeOfUser + " where email = '" + email + "';";
    db.con.query(verifyIfexists, function (err, rows) {
        if (err) {
            res.json({
                success: false,
            });
            return;
        }
        else {
            sqlResult = rows;
            if (sqlResult.length == 0) {
                var sql = "INSERT INTO " + typeOfUser + " (name, email, Password) VALUES('" + name + "','" + email + "', '" + password + "');";
                db.con.query(sql, function (err, result) {
                    if (err) {
                        res.json({
                            success: false,
                        });
                        return;
                    }
                    else {

                        res.json({
                          success: true,
                          data: {
                            email: email,
                            type: typeOfUser
                          }
                        });
                        return;
                    }
                });
            }
            else {
                res.json({
                    success: false,
                });
                return;
            }
        }
    });
}
module.exports.postRegister = postRegister;