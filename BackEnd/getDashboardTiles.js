
var db = require('./db_connection');


let getMainPage = (req, res) => {
    console.log("Get Main Page");
    const email = req.query.email;
    const type = req.query.type;

    if (type === "Student") {
        var query1 = "select c.courseName,c.courseID from Courses c, enroll_wait e where e.st_mail = '" + email + "' and e.courseID=c.courseID;";

        db.con.query(query1, (err, rows) => {
            if (err) {
                throw err;
            }
            else {
                console.log("Rows courses: " + rows);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                console.log(JSON.stringify(rows));
                res.end(JSON.stringify(rows));
            }

        });
    }
    else {
        var query2 = "select c.courseName,c.courseID from Courses c where c.fa_mail = '" + email + "';";

        db.con.query(query2, (err, rows) => {
            if (err) {
                throw err;
            }
            else {
                console.log("Rows courses: " + rows);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                console.log(JSON.stringify(rows));
                res.end(JSON.stringify(rows));
            }

        });
    }

}

module.exports.getMainPage = getMainPage;