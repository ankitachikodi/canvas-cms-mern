import lib from './../isLogin';
import React from 'react'
const axios = require("axios");
class StudentSubmitAssignment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      st_mail: lib.getUser().email,
      assignmentID: this.props.match.params.assignmentId,
      //courseID: '7879',

      // title: '',
      // deadline: ''
      // message: 'Assignment 1'
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    //this.onChangeText = this.onChangeText.bind(this);
  }
  
  onFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("assignSubmission", this.state.file);
    formData.append("st_mail", this.state.st_mail);
    formData.append("title", this.state.title);
    formData.append("deadline", this.state.deadline);
    formData.append("assignmentID", this.state.assignmentID);
    console.log("assg_id: " + this.state.assignmentID);
    const config = {
      headers: {"content-type": "multipart/form-data"},
        assg_id: this.props.assignmentID
      
      
    };
    console.log("Config: "+config.assg_id);
    //const data = {assignmentID:this.state.assignmentID};
    axios
        .post("http://localhost:3001/assignmentSubmitStudent", formData, config)
      .then(response => {
        alert("The file is successfully uploaded");
      })
      .catch(error => {});
  }
  onChange(e) {
    this.setState({ file: e.target.files[0] });
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <h1>Assignment Submit</h1>
        {/* <input type="date" onChange={this.onChangeText} name='deadline' />
                <input type="text" onChange={this.onChangeText} name='title' /> */}

        <input type="file" name="assignSubmission" onChange={this.onChange} />
        <br />
        <button  type="button" class="btn btn-primary">Upload</button>
      </form>
    );
  }
}

export default StudentSubmitAssignment;























// import React, { Component } from 'react';
// import axios from 'axios';

// export default class AssignmentFaculty extends Component {
//     constructor() {
//         super();
//         this.state = {
//             description: '',
//             selectedFile: null,
//         };
//     }

//     onChange = (e) => {
//         switch (e.target.name) {
//             case 'selectedFile':
//                 this.setState({ selectedFile: e.target.files[0] });
//                 break;
//             default:
//                 this.setState({ [e.target.name]: e.target.value });
//         }
//     }

//     onSubmit = (e) => {
//         console.log("inside submit post");
//         e.preventDefault();
//         // const data ={
//         //     description :this.state.description,
//         //     selectedFile : this.state.selectedFile
//         // }

//         let formData = new FormData();

//         formData.append('description', this.state.description);
//         formData.append('selectedFile', this.state.selectedFile);

//         axios
//           .post("/http://localhost:3001/upload", formData)
//             .then(response =>
//             {
//             console.log(response.body);
//             console.log("Status Code : ", response.status);
//             if (response.status === 200) 
//             {
//                 this.setState({
//                     authFlag: true,
//                     assignmentAdded: true
//                 })
//             } else 
//             {
//                 this.setState({
//                     authFlag: false,
//                     assignmentAdded: false
//                 })
//             }
//         });
//     }

//     render() {
//         const { description, selectedFile } = this.state;
//         return (
//           <form>
//             <input
//               type="text"
//               name="description"
//               value={description}
//               onChange={this.onChange}
//             />
//             <input
//               type="file"
//               name="selectedFile"
//               onChange={this.onChange}
//             />
//             <button type="submit" onSubmit={this.onSubmit}>
//               Submit
//             </button>
//           </form>
//         );
//     }
// }



































// import React, { Component } from "react";
// import axios from "axios";
// import { read } from "fs";

// export default class AssignmentFaculty extends Component 
// {
//     constructor(props) {
//         super(props);
//         this.state={
//           //  assignmentFile: '',
//             //courseID: '7879',
//             //cookie.load('courseID'),
//             assignment: ''
//         }
//     }

// selectedFileHandler = e => {
// //    this.setState({
// //        file:e.target.files
// //     })
//     let files = e.target.files;
//     let reader = new FileReader();
//     reader.readAsDataURL(files[0]);
//     reader.onload = (e) =>{

//         const url = 'http://localhost:3001/assignmentFaculty';
//         const data = {file: e.target.files}

//         return (axios.post(url, data)
//         .then(response => console.warn("resul", response)));
//     }
// }


// // onAssignmentCreation = e =>{
// //     e.preventDefault();
// //     const assignmentData ={
// //         courseID: this.state.courseID,
// //       //  assignmentFile: this.assignmentFile,
// //         selectedFile: this.selectedFile
// //     };
// //     axios.post('http://localhost:3001/assignmentFaculty', assignmentData)
// //         .then(response => 
// //             {
// //             console.log(response.body);
// //             console.log("Status Code : ", response.status);
// //             if (response.status === 200) 
// //             {
// //                 this.setState({
// //                     authFlag: true,
// //                     assignmentAdded: true
// //                 })
// //             } else 
// //             {
// //                 this.setState({
// //                     authFlag: false,
// //                     assignmentAdded: false
// //                 })
// //             }
// //         });
// // }


// render() 
// {
//     return(
//     <div>
//         <input type="file" onChange = {this.selectedFileHandler} />
//         <button onClick={this.onAssignmentCreation}> Upload </button> 
//     </div>
//     ); 
// }
// }
