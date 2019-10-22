// var login = require('./Login.js');
// var index = require('./index.js');
var db = require('./db_connection');

var query1;
var query2;
var query3;
var query3;
var courseCapacity;
var currentWaitlist;


let getViewDropCourses = (req, res) => {
    console.log("Get View Drop Courses");

    var email = req.query.email;
    console.log("Student Email: " + email);
    query1 = "select enroll_wait.courseID,enroll_wait.term,enroll_wait.fa_mail,Courses.courseName,Courses.courseDept from enroll_wait,Courses where enroll_wait.courseID=Courses.courseID and enroll_wait.st_mail ='" + email + "';";
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

let postViewDropCourses = (req, res) => {
    console.log("Post View Drop Page");
    var faculty;
    var term;
    var wait_no;
    var email = req.body.email;
    var courseID = req.body.courseID;

    console.log("Student Email: " + email);
    console.log("Course: " + courseID);
    query2 = "delete from enroll_wait where Email ='" + email + "' and courseID='" + courseID + "';";
    query1 = "select fa_mail,term,wait_no from enroll_wait where st_mail ='" + email + "' and courseID='" + courseID + "';";
    query5 = "select enr.courseID,enr.term,enr.fa_mail,cd.courseName,cd.courseDept from enroll_wait as enr,Courses as cd where enr.courseID=cd.courseID and enr.st_mail ='" + email + "';";

    db.con.query(query1, (err, rows) =>           //extracted the faculty and term of the course to be deleted
    {
        if (err) {
            throw err;
        }
        else {

            faculty = rows[0].fa_mail;
            term = rows[0].term;
            wait_no = rows[0].wait_no;
            console.log("Faculty:" + faculty);
            console.log("Term:" + term);
            console.log("Wait position:" + wait_no);
        }

    });
    db.con.query(query2, (err, result1) =>       //deleted from enroll_wait table
    {
        if (err) { throw err; }
        else {
            if (wait_no === null || wait_no === 0)     //increase the class capacity
            {
                console.log("Inside if of wait_no===null");

                query3 = "select courseCapacity,currentWaitlist from Courses where courseID=" + courseID + " and fa_mail='" + faculty + "' and courseTerm='" + term + "';";
                console.log("query: " + query3);
                db.con.query(query3, (err, rows) => {
                    if (err) { throw err; }
                    else {
                        console.log("updated course capacity");
                        courseCapacity = rows[0].courseCapacity;
                        //wait_no = rows[0].wait_no;
                        console.log("courseCapacity:" + courseCapacity);
                        //console.log("wait_no:"+wait_no);
                        courseCapacity = courseCapacity + 1;
                        query4 = "update Courses set courseCapacity=" + courseCapacity + " where courseID=" + courseID + " and fa_mail='" + faculty + "' and courseTerm='" + term + "';";
                        db.con.query(query4, (err, rows) => {
                            if (err) { throw err; }
                            else {
                                // res.writeHead(200,{'Content-type':'application/json'});
                                // //console.log(JSON.stringify(result));
                                // res.end("Dropped");
                                db.con.query(query5, (err, result) => {
                                    if (err) { throw err; }
                                    else {
                                        res.writeHead(200, { 'Content-type': 'application/json' });
                                        console.log(JSON.stringify(result));
                                        res.end(JSON.stringify(result));
                                    }
                                });

                            }

                        })
                    }
                })
            }
            else if (wait_no > 0)        //increase the waitlist capacity
            {
                console.log("Inside if of wait_no===null");

                query3 = "select courseCapacity,currentWaitlist from Courses where courseID=" + courseID + " and fa_mail='" + faculty + "' and courseTerm='" + term + "';";
                console.log("query: " + query3);
                db.con.query(query3, (err, rows) => {
                    if (err) { throw err; }
                    else {
                        console.log("updated course capacity");
                        //var courseCapacity = rows[0].courseCapacity;
                        currentWaitlist = rows[0].currentWaitlist;
                        //console.log("courseCapacity:"+courseCapacity);
                        console.log("currentWaitlist:" + currentWaitlist);
                        currentWaitlist = currentWaitlist + 1;
                        query4 = "update Courses set currentWaitlist=" + currentWaitlist + " where courseID=" + courseID + " and fa_mail='" + faculty + "' and courseTerm='" + term + "';";
                        db.con.query(query4, (err, rows) => {
                            if (err) { throw err; }
                            else {
                                // res.writeHead(200,{'Content-type':'application/json'});
                                // //console.log(JSON.stringify(result));
                                // res.end("Dropped");
                                db.con.query(query1, (err, result) => {
                                    if (err) { throw err; }
                                    else {
                                        res.writeHead(200, { 'Content-type': 'application/json' });
                                        console.log(JSON.stringify(result));
                                        res.end(JSON.stringify(result));
                                    }
                                });

                            }

                        })
                    }
                })
            }
        }
    });
}


module.exports.getViewDropCourses = getViewDropCourses;
module.exports.postViewDropCourses = postViewDropCourses;