var login = require('./Login.js');
var index = require('./index.js');
var db = require('./db_connection');


let getEditProfile = (req, res) => {
    console.log("Get Display Page");
    console.log(req.query.email);
    console.log(req.query.type);

    var type = req.query.type;
    var email = req.query.email;
    var query = "SELECT *from " + type + " WHERE email = '" + email + "'";

    db.con.query(query, (err, result) => {
        if (err) {
            throw err;
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        console.log(JSON.stringify(result));
        res.end(JSON.stringify(result));

    });

}

let postEditProfile = (req, res) => {
    console.log("Post Display Page");
    console.log(req.body);
    

    var type = req.body.type;
    var email = req.body.email;
    var name = req.body.name;
    var phoneno = req.body.phoneno;
    var aboutme = req.body.aboutme;
    console.log("About Me:" + aboutme);
    var city = req.body.city;
    var country = req.body.country;
    var school = req.body.school;
    var hometown = req.body.hometown;
    var query = "update " + type + " set Name='" + name + "', PHONENO='" + phoneno + "', ABOUTME='" + aboutme + "', CITY='" + city + "';";

    db.con.query(query, (err, result) => {
        if (err) {
            res.send(
                {
                    success : false
                }
            )
            return;
        }
        res.send({
            success :true
        });

    });

}

module.exports.getEditProfile = getEditProfile;
module.exports.postEditProfile = postEditProfile;