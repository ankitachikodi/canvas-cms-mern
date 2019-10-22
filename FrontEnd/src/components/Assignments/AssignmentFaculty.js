import React from 'react'
const axios = require("axios");

class AssignmentFaculty extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null,
          courseID: ((this.props.match || {}).params || {}).courseId,
            title: '',
            deadline: ''
           // message: 'Assignment 1'
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
    }
    onFormSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("assignFile", this.state.file);
        formData.append("courseID" , this.state.courseID);
        formData.append("title", this.state.title);
        formData.append("deadline", this.state.deadline);

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios
          .post("http://localhost:3001/upload", formData, config)
          .then(response => {
            alert("The file is successfully uploaded");
          })
          .catch(error => {});
    }
    onChange(e) {
        this.setState({ file: e.target.files[0] });
        
    }
    onChangeText(e) { 
        e.persist();
        let name = e.target.name;
        console.log(e.target.name,e.target.value)
        let changes = {};
        changes[name] = e.target.value;
        this.setState(changes);
    }

    render() {
        return (
          <form onSubmit={this.onFormSubmit}>
            <h1>File Upload</h1>
            Assignment Name{" "}
            <input
              type="text"
              onChange={this.onChangeText}
              name="title"
            />{" "}
            <br /> <br />
            Assignment Due Date{" "}
            <input
              type="date"
              onChange={this.onChangeText}
              name="deadline"
            />
            <br /> <br /> Select Assignment File 
            <input
              type="file"
              name="assignFile"
              onChange={this.onChange}
                /> <br /> <br /> 
                <button type="button" class="btn btn-primary">Upload</button>
          </form>
        );
    }
}

export default AssignmentFaculty;

























































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
