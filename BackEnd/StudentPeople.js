var db = require('./db_connection');

let getDisplayAllStudents = (req, res) => {
    var courseID = req.query.courseID;
    console.log("query", req.query);


    query1 = "select st.Name,st.Email from Student st,enroll_wait en where en.courseID='" + courseID + "' and en.st_mail=st.Email and en.wait_no is null;"
    db.con.query(query1, (err, rows) => {
        if (err) {
            throw err;
        }
        else {
            res.writeHead(200, { 'Content-Type': 'application/json' });

            console.log(JSON.stringify(rows));
            res.end(JSON.stringify(rows));

        }
    })


}
module.exports.getDisplayAllStudents = getDisplayAllStudents;