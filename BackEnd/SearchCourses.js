// var login = require('./Login.js');
// var index = require('./index.js');
var db = require('./db_connection');


let getSearchCourses = (req, res) => {
    console.log("Get Search Courses");
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end("Search Page");

}

let postSearchCourses = (req, res) => {
    var resultQ = [];
    console.log("Post Search Page");
    var query1;
    var category = req.body.category;
    console.log("Category: " + category);
    var categoryVal = req.body.categoryVal;
    console.log("CategoryVal: " + categoryVal);
    var selectedVal = req.body.selectedVal;
    console.log("SelectedVal: " + selectedVal);

    if (category === "cno_category") {
        if (categoryVal === "like") {
            query1 = "select * from Courses where courseID like '%" + selectedVal + "%';";
        }
        else {
            query1 = "select * from Courses where courseID " + categoryVal + " " + selectedVal + ";";
        }

        db.con.query(query1, (err, result) => {
            if (err) {
                throw err;
            }
            else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                console.log(JSON.stringify(result));
                res.end(JSON.stringify(result));
            }

        });

    }
    else if (category === "cname_category") {
        if (categoryVal === "like") {
            query1 = "select * from Courses where courseName like '%" + selectedVal + "%';";
        }
        else {
            query1 = "select * from Courses where courseName " + categoryVal + " '" + selectedVal + "';";
        }
        db.con.query(query1, (err, result) => {
            if (err) {
                throw err;
            }
            else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                console.log(JSON.stringify(result));
                res.end(JSON.stringify(result));
            }

        });
    }
    else if (category === "c_term") {
        query1 = "select * from Courses where courseTerm=" + "'" + categoryVal + "';";

        db.con.query(query1, (err, result) => {
            if (err) {
                throw err;
            }
            else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                console.log(JSON.stringify(result));
                res.end(JSON.stringify(result));
            }

        });
    }




}


module.exports.getSearchCourses = getSearchCourses;
module.exports.postSearchCourses = postSearchCourses;