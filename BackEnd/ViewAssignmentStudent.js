var db = require('./db_connection.js');


let getViewAssignment = (req, res) => {

    var courseID = req.query.courseID;
   
     
    var sql = "Select assignment_file, assignment_id, title, deadline from assg_create where courseID ='" + courseID +"'";
    console.log(sql);
      db.con.query(sql, function (err, result) {
        console.log("abcd")
        if (err) {
            console.log("Error");
            throw err;
        }
        else {
            console.log("Result: " + JSON.stringify(result));
            // res.writeHead(200, { 'Content-Type': 'application/json' });
            res.send(result);
        }

    })
}



module.exports.getViewAssignment = getViewAssignment;
