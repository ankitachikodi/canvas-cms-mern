var db = require('./db_connection.js');
var express = require('express');
var bodyparser = require('body-parser');
var cookie = require('cookie-parser');
var session = require('express-session');
var md5 = require('md5');
var indexPage = require('./index.js');

//var main = require('./index.js');


let getLogin = (req, res) => {
    console.log("Get Login");
}

let postLogin = (req, res) => {
    var email = req.body.email;
    console.log(email);
    var password = req.body.password;
    console.log(password);
    password = md5(password);
    console.log(password);
    var typeOfUser = req.body.type;
    console.log("Type of user: " + typeOfUser);

    var getPassword = "Select email,password from " + typeOfUser + " where email = '" + email + "' and password = '" + password + "';"
    getPassword = "Select email from " + typeOfUser + " where email = '" + email + "';"
    var sqlResult = [];

    db.con.query(getPassword, function (err, rows) {
        if (err) {
            res.send({
                success: false
            });
            return;
        }
        else {
            sqlResult = rows;
            console.log(sqlResult);
            if (sqlResult.length == 0) {
                res.send({
                    success: false
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
        }
    });


}


module.exports.getLogin = getLogin;
module.exports.postLogin = postLogin;