var login = require('./Login.js');
var index = require('./index.js');
var db = require('./db_connection');


let getDisplayProfile = (req, res) => {
    console.log("Get Display Page");    

    var type = req.query.type;
    var email = req.query.email;
    var query = "SELECT * from " + type + " WHERE Email = '" + email + "'";

    db.con.query(query, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(JSON.stringify(result));
        res.send({
            success : true,
            data: result[0]
        });

    });

}

let postDisplayProfile = (req, res) => {
    console.log("Post Display Page");
    // console.log(req.body.email);
    // console.log(req.body.type);

    // var type = req.body.type;
    // var email = req.body.email;
    // var name = req.body.name;
    // var phoneno = req.body.phoneno;
    // var aboutme = req.body.aboutme;
    // var city = req.body.city;
    // var country = req.body.country;
    // var school = req.body.school;
    // var hometown = req.body.hometown;
    // var query = "update "+type+" set name='"+name+"', phoneno='"+phoneno+"', aboutme='"+aboutme+"', city='"+city+"', country='"+country+"',school='"+school+"', hometown='"+hometown+"' where email='"+email+"';";

    // db.con.query(query, (err, result) => {
    //     if(err)
    //     {
    //         throw err;
    //     } 
    res.writeHead(200, { 'Content-Type': 'application/json' });
    //    console.log(JSON.stringify(result));
    //    res.end(JSON.stringify(result));  
    res.end("Posted data to edit");

}

module.exports.getDisplayProfile = getDisplayProfile;
module.exports.postDisplayProfile = postDisplayProfile;