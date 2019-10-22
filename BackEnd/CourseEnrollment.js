var db = require("./db_connection.js");


let postCourseEnrollment =(req, res) => {
    var courseID = req.body.courseID;
    
    var email = req.body.email;
    var term = req.body.term;
   
    var query = "INSERT INTO Enrolled_Courses(Email,courseID, Term) VALUES ('" + email + "','" + courseID + "','" +term+  "')";
    db.con.query(query, function (err, result) {
        if (err)
            throw err;
        console.log(result);
        updateCourse();
    });
    function updateCourse() {
        var query4 = "Select courseCapacity from Course where courseID ='" +courseID + "'";
        if(query4>0){

    
        var query2 = "UPDATE Course SET courseCapacity = courseCapacity-1 WHERE courseID='" + courseID + "'";
        db.con.query(query2, function (err, result) {
            if (err)
                throw err;
            console.log('RESULT ', result);
        }
        )
    }
     else{
            var query5 = "UPDATE Course SET waitlistCapacity = waitlistCapacity-1 WHERE courseID='" + courseID + "'";
            var query6 = "UPDATE Course SET waitlistNo = waitlistNo+1 WHERE courseID='" +courseID + "'";
            db.con.query(query5, function (err, result) {
                if (err)
                    throw err;
                console.log('RESULT db ', result);
            })
            db.con.query(query6, function (err, result) {
                if (err)
                    throw err;
                console.log('RESULT db1', result);
            })
            
        }
     
    }
    res.send('true');
}




let getAvailableCourses =(req, res)=> {
    var query = "SELECT courseID, courseCapacity, waitlistCapacity FROM Course";
    var resp;
    db.con.query(query, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        //res.writeHead(200,{'Content-Type': 'text/plain'});
        res.end(JSON.stringify(result));
    });
    
}

module.exports.postCourseEnrollment = postCourseEnrollment;
module.exports.getAvailableCourses = getAvailableCourses;