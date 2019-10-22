const multer = require("multer");
var db = require("./db_connection.js");
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '.pdf');
  }
});
var upload = multer({storage: storage}).single('assignFile');

let postUpload = (req,res) =>{
    upload(req,res, function(err){
        if(err){
            console.log("Error occured", err)
        }
      console.log(req.files, req.file, req.body);
        
        res.json({
            success:true,
            message: 'File Uploaded!'
            


        })
       
      var assignment_file = req.file.path;
      var courseID = req.body.courseID;
      var title = req.body.title;
      var deadline = req.body.deadline;
      var slicePath = assignment_file.slice(7)
      var query =
        "INSERT INTO assg_create (assignment_file,courseID,title, deadline) VALUES ('" +
        slicePath +
        "','" +
        courseID +
        "','" +
        title +
        "','" +
        deadline +
        "')";
      db.con.query(query, function (err, result) {
        if (err)
          throw err;
        console.log(result);
        
      });
    })
}

module.exports.postUpload = postUpload;






























// let postAssignmentCreation = (req,res) =>{
//     console.log("Inside Post Assignment page");
//     var file = req.body.file;
//     //var courseid = '7879';
//     //var query = "Select courseID from Course where courseID = '" + courseid + "';";
//    // console.log(query);
    
//     if(file!=''){
//        // var sql = "Insert into Assignment (file) where courseID = '" + courseid + "';";
//         var sql =
//           "Insert into Assignment (AssignmentFile) values '("+file+")' where courseID = '7879';";
//        console.log(sql);

//         db.con.query(sql, function (err, result) {
//             console.log("abcd")
//             if (err) {
//               console.log("Error");
//               throw err;
//             } else {
//               console.log("Result: " + JSON.stringify(result));
//               res.writeHead(200, {
//                 "Content-Type": "application/json"
//               });
//               res.end("Added assignment");
//             }
//         })
//     }

// }

// let getAssignmentCreation = (req, res) => {

//     console.log("Inside get Assignment page");

// }

// module.exports.postAssignmentCreation = postAssignmentCreation;
// module.exports.getssignmentCreation = getAssignmentCreation;