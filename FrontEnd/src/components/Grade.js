import React, { Component } from 'react';
import cookie from 'react-cookies';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import lib from './isLogin'
class Grade extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courseID: ((this.props.match || {}).params || {}).courseId,

            userType: lib.getUser().type,
            studentName: "",
            studentMail: lib.getUser().email,
            studentListArray: [{
                Assignment: 'Assignment 1',
                Grade: "10/10"

            },{
                    Assignment: 'Quiz 1',
                    Grade: "5/10"
            }],
            Total:[{
                Total: "Total",
                Points: "15/20"
            }]
          

        }

    }
    

    render() {
        let final = this.state.Total.map(x => {
            return (
              <tr>
                <td>
                  <b>{x.Total}</b>
                </td>
                <td>
                  <b>{x.Points}</b>
                </td>
              </tr>
            );
        })
        let studentList = this.state.studentListArray.map(searchResult => {
            return (
                <tr>
                    <td><p>{searchResult.Assignment}</p></td>
                    <td><p>{searchResult.Grade}</p></td>
                   

                </tr>

            )
        })

        return (
          <div class="container">
            <h3>Your Grades</h3>
            <table class="table">
              <thead>
                <tr>
                  <th>Exam</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>{studentList}</tbody>
              <tbody>{final}</tbody>
            </table>
          </div>
        );
    }
}



export default Grade;



//     render() {
//         let studentList = this.state.studentListArray.map(searchResult => {
//             return (
//                 <tr>
//                     <td>{searchResult.Assignment}</td>
//                     <td>{searchResult.Grade}</td>
//                 </tr>

//             )
//         })
//         let quizList = this.state.quizArray.map(searchResult => {
//             return (
//                 <tr>
//                     <td>{searchResult.Quiz}</td>
//                     <td>{searchResult.Grade}</td>
//                 </tr>

//             )
//         })

//         return (

//             <div class="container">
//                 <h3>Grades</h3>
//                 <table class="table">
//                     <thead>
//                         <tr>
//                             <th>Assignment</th>
//                             <th>Grade</th>
//                         </tr></thead>
//                     <tbody>
//                         {studentList}
//                     </tbody></table>

//                 <table class="table">
//                     <thead>
//                         <tr>
//                             <th>Quiz</th>
//                             <th>Grade</th>
//                         </tr></thead>
//                     <tbody>
//                         {quizList}
//                     </tbody></table>
//             </div>
//         )
//     }
// }

