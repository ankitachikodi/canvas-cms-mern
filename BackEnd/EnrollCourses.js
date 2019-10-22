// var login = require('./Login.js');
// var index = require('./index.js');
var db = require('./db_connection');



let postEnrollCourses = (req, res) => {
    var resultQ = [];
    //console.log("Post Enroll Courses Page");

    var courseID = req.body.courseID;
    //console.log("Courseid: " + courseID);
    var courseTerm = req.body.courseTerm;
    //console.log("courseTerm: " + courseTerm);
    var facultyemail = req.body.facultyemail;
    //console.log("facultyemail: " + facultyemail);
    var stemail = req.body.stemail;
    //console.log("stemail: " + stemail);

    var sendResult;
    var sqlResult;
    var capacityResult;
    var curr_wait;
    var waitPos;
    var waitCapacity;

    var query1 = "select * from enroll_wait where st_mail= '" + stemail + "' and courseID='" + courseID + "';";

    db.con.query(query1, (err, rows) =>     //check if already enrolled
    {
        if (err) { throw err; }
        else {
            sqlResult = rows;
            //console.log(JSON.stringify(sqlResult));
            if (sqlResult.length == 0)       //not enrolled already
            {
                //console.log("Not enrolled already");
                var capacity = "select courseCapacity  from Courses where courseID='" + courseID + "' and fa_mail='" + facultyemail + "' and courseTerm='" + courseTerm + "';";
                //console.log(capacity);
                db.con.query(capacity, function (err, rows)   //check course capacity
                {
                    //console.log("Extracted course capacity");
                    if (err) { throw err; }
                    else {
                        var insert = "INSERT INTO enroll_wait (st_mail,courseID,fa_mail,term) VALUES('" + stemail + "','" + courseID + "', '" + facultyemail + "','" + courseTerm + "');";
                        //console.log("Original course capacity:");
                        capacityResult = (JSON.stringify(rows[0].courseCapacity));
                        //console.log("Original course capacity: ", capacityResult);
                        if (capacityResult > 0)      //capcity not full
                        {
                            //console.log("capacity not full", insert);
                            db.con.query(insert, function (err, result)       //enroll student
                            {
                                //console.log("Enroll student", err);
                                if (err) { throw err; }
                                else {
                                    sendResult = "Enrolled";
                                    capacityResult = capacityResult - 1;
                                    //console.log("Updated course capacity: " + capacityResult);
                                    var updateCapacity = "update Courses set courseCapacity='" + capacityResult + "' where courseID='" + courseID + "' and fa_mail='" + facultyemail + "' and courseTerm='" + courseTerm + "';";
                                    db.con.query(updateCapacity, function (err, result)   //update course capacity
                                    {
                                        //console.log("Updated the course capacity");
                                        if (err) { throw err; }
                                        else {

                                            //console.log("Updated course capacity & enrolled the student");     //return writehead
                                            res.writeHead(200, { 'Content-Type': 'application/json' });
                                            //res.writeHead(200,{'Content-Type': 'text/plain'});
                                            res.end(sendResult);
                                        }
                                    })

                                }
                            })
                        }
                        else            //course capacity full
                        {
                            //console.log("Course capacity full. Check waitlist");
                            var checkWait = "select waitlistCapacity,currentWaitlist from Courses where courseID='" + courseID + "' and facultyemail='" + facultyemail + "' and courseTerm='" + courseTerm + "';";
                            db.con.query(checkWait, function (err, rows)      //check original waitlist capacity -->Courses
                            {
                                if (err) { throw err; }
                                else {
                                    waitCapacity = JSON.stringify(rows[0].waitlistCapacity);
                                    //console.log("Waitlist capacity:" + waitCapacity);
                                    curr_wait = JSON.stringify(rows[0].currentWaitlist);
                                    //console.log("Current capacity:" + curr_wait);
                                    if (curr_wait > 0)        //waitlist capacity not full
                                    {
                                        waitPos = waitCapacity - (curr_wait - 1);
                                        //console.log("Wait position: " + waitPos);

                                        var wait_pos = "INSERT INTO enroll_wait (st_mail,courseID,fa_mail,term,wait_no) VALUES('" + stemail + "','" + courseID + "', '" + facultyemail + "','" + courseTerm + "'," + waitPos + ");";
                                        db.con.query(wait_pos, function (err, result)       //waitlist pos --> enroll_wait
                                        {
                                            if (err) { throw err; }
                                            else {
                                                //console.log("Updated waitlist capacity & added student to waitlist"); //add waitlist position to student table                                                       
                                            }
                                        })
                                        curr_wait = curr_wait - 1;        //update curr waitlist capacity -->Courses
                                        var updateCurrCapacity = "update Courses set currentWaitlist=" + curr_wait + " where courseID='" + courseID + "' and fa_mail='" + facultyemail + "' and courseTerm='" + courseTerm + "';";
                                        db.con.query(updateCurrCapacity, function (err, result) {
                                            if (err) { throw err; }
                                            else {
                                                //console.log("Updated waitlist capacity & added student to waitlist"); //add waitlist position to student table
                                                res.writeHead(200, { 'Content-Type': 'application/json' });
                                                sendResult = "Added to waitlist at position: " + waitPos;
                                                res.end(sendResult);
                                            }

                                        })
                                    }
                                    else if (curr_wait == 0)        //wailist capacity full  --> send writehead
                                    {
                                        //console.log("Waitlist full");
                                        sendResult = "Waitlist full";
                                        res.writeHead(200, { 'Content-Type': 'application/json' });

                                        res.end("Waitlist full");

                                    }
                                }
                            })
                        }

                    }
                });
            }
            else {
                //console.log("Already enrolled");
                sendResult = "Already enrolled";
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(sendResult);

            }
            // res.writeHead(200,{'Content-Type': 'application/json'}); 
            // res.end(sendResult);

        }


    });

}


module.exports.postEnrollCourses = postEnrollCourses;



