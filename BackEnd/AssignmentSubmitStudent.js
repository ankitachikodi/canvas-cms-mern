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
var upload = multer({ storage: storage }).single("assignSubmission");

let postSubmitAssignment = (req, res) => {
  upload(req, res, function(err) {
    if (err) {
      console.log("Error occured", err);
    }
    console.log("heeeerrrrrrrrrrrrr",req.files, req.file, req.body);

    res.json({
      success: true,
      message: "File Uploaded!"
    });

      var assignmentID = req.body.assignmentID;
      var assignSubmission = req.file.path;
      var st_mail = req.body.st_mail;
      var slicePath = assignSubmission.slice(7);
      
    var sql =
      "Insert into assg_sub (assignment_file,st_mail,assignment_id) values ('" +
      slicePath +
      "','" +
      st_mail +
      "','" + assignmentID +
      "')";

    console.log(sql);
    db.con.query(sql, function(err, result) {
      if (err) throw err;
      console.log(result);
    });
  });
};
module.exports.postSubmitAssignment = postSubmitAssignment;