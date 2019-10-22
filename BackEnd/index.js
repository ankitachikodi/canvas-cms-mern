var login = require('./Login.js');
var register = require('./Register.js');
var express = require ('express');
var bodyparser = require ('body-parser');
var cookie = require('cookie-parser');
var session = require('express-session');
var displayProfile = require('./DisplayProfile');
var cors = require('cors');
var course = require('./CourseCreation');
var app = express();
var courseEnrollment = require('./CourseEnrollment');
var assignmentFaculty = require('./AssignmentFaculty');
var viewAssignments = require("./ViewAssignmentStudent");
var assignmentSubmitStudent = require("./AssignmentSubmitStudent");
var editProfile =require ("./EditProfile");
var searchcourses = require("./SearchCourses");
var viewcourses = require("./EnrollCourses");
var mainPage = require("./getDashboardTiles");
var studentPeople = require("./StudentPeople");
var dropCourse = require("./ViewDropCourses");


app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

app.use(bodyparser.json());
//app.use(bodyparser.urlencoded());
app.use(express.static("public"));

app.use(bodyparser.urlencoded());
app.use(cookie());
app.use(session({
        key:'sessid',
        secret:'myencryptionkey',
        resave:false,
        saveUninitialized:false,
        cookie:{
            path: '/',
            expires: (1*60*1000)        //1 minute
        }

}));


function checkSession(req,res,next)             //to check if session exists
{
    if(!req.session.user || !req.cookies.sessid)    //these values are set after the credentials are accepted. user ID is assigned to session user
    {
        delete req.session.user;    //delete the cookies and session before starting a new one.. so that cookies cannot be misused
        res.clearCookie('sessid');
        res.render('login', {error: "!Session does not exist!"});   //render is used here because redirect cannot accept {error:""} parameters
    }
    else{
        next();     //this will navigate to the next function called after the checkSession function in the get or post method
    }

}

app.get('/login',function(req,res){
    login.getLogin(req,res);
});

app.post('/login',function(req,res){
    login.postLogin(req,res);
});

app.get('/createcourses', function(req,res){
    course.getCourseRegistered(req,res);
});

app.post('/createcourses', function (req, res) {
    course.postCourseCreation(req, res);
});

app.post('/register', function(req,res,next){
    register.postRegister(req,res);
});

app.get('/register',function(req,res){
    login.getRegister(req,res);
});

app.get('/displayProfile', displayProfile.getDisplayProfile);

app.get('/availableCourses', function(req,res){
    courseEnrollment.getAvailableCourses(req, res);
})
app.post('/courseEnrollment', function(req,res){
    courseEnrollment.postCourseEnrollment(req,res);
});

app.get('/editProfile', editProfile.getEditProfile);
app.post('/editProfile', editProfile.postEditProfile);


//app.get('/SearchCourses', searchcourses.getSearchCourses);
app.post('/SearchCourses', searchcourses.postSearchCourses);

app.get('/assignmentFaculty', function (req, res) {
    assignmentFaculty.getAssignmentCreation(req, res);
})
app.post("/assignmentFaculty", function(req, res) {
    assignmentFaculty.postAssignmentCreation(req, res);
});

app.post('/upload', assignmentFaculty.postUpload)
app.post('/EnrollCourses', viewcourses.postEnrollCourses)

app.get('/viewStudents', studentPeople.getDisplayAllStudents)
app.get('/mainPage', mainPage.getMainPage)
app.get('/ViewDropCourses', dropCourse.getViewDropCourses)
app.post("/ViewDropCourses", dropCourse.postViewDropCourses);



module.exports = app;
module.exports = checkSession;



app.get('/viewAssignments', viewAssignments.getViewAssignment)
app.post(
    "/assignmentSubmitStudent",
    assignmentSubmitStudent.postSubmitAssignment
    );
    app.listen(3001);
    console.log("Server Listening on port 3001");