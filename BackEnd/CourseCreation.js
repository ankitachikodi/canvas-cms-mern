var db = require('./db_connection.js');
var express = require('express');
var bodyparser = require('body-parser');
var cookie = require('cookie-parser');
var session = require('express-session');


let postCourseCreation = (req, res) =>{

    console.log("post course creation");
    var courseID = req.body.courseID;
    console.log(courseID);
      var courseName = req.body.courseName;
    console.log(courseName);
       var courseDept = req.body.courseDept;

       var  courseRoom = req.body.courseRoom;
       var courseCapacity = req.body.courseCapacity;
       var waitlistCapacity = req.body.waitlistCapacity;
       var courseTerm = req.body.courseTerm;


    
        console.log("Connected at course table!");
        var sql = "INSERT INTO Courses (courseID, courseName, courseDept, courseRoom, courseCapacity, waitlistCapacity, courseTerm ) VALUES ('" + courseID + "','"  + courseName + "', '" + courseDept + "','"+ courseRoom + "','"  + courseCapacity + "','" + waitlistCapacity + "', '" + courseTerm + "');";
        db.con.query(sql, function (err, result) 
        {
            console.log("abcd")
            if (err) {
                console.log("Error");
                throw err;
            }
            else {
                console.log("Result: " + JSON.stringify(result));
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end("Added a new course");
            }

        })
    }

        
    
let getCourseRegistered = (req, res) => {

    console.log("Get courese registered");
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end("Rendering Register");
}

module.exports.postCourseCreation = postCourseCreation;
module.exports.getCourseRegistered = getCourseRegistered;