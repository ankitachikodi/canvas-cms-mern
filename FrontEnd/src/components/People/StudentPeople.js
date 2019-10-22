import React, { Component } from 'react';
import cookie from 'react-cookies';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import lib from './../isLogin'
class StudentPeople extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courseID: ((this.props.match || {}).params || {}).courseId,

            userType: lib.getUser().type,
            studentName: "",
            studentMail: lib.getUser().email,
            studentListArray: [],
            searchCompleted: false,

        }

    }
    componentWillMount() {
        console.log("Inside will mount");
       // var courseId = this.props.match.params.courseId;

       // console.log("in StudentPeople-courseId: " + courseId);
       var data ={
           courseID: this.state.courseID,
          
           studentName: this.state.studentName,
          
       }

        axios.get("http://localhost:3001/viewStudents?courseID="+data.courseID)
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        searchCompleted: true,
                        studentListArray: response.data
                    });

                }
                else {
                    this.setState({
                        searchCompleted: false
                    });
                }
            });
    }


    render() {
        let studentList = this.state.studentListArray.map(searchResult => {
            return (
              <tr>
                <td>
                  <h3>{searchResult.Name}</h3>
                </td>
                <td>
                  <h3>{searchResult.Email}</h3>
                </td> 
                <td>
                
                    </td>
              </tr>
            );
        })
    
        return (

            <div class="container">
                <h3>Students enrolled in the course</h3>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Student Name</th>
                            <th>Student EmailID</th>
                            
                        </tr></thead>
                    <tbody>
                        {studentList}
                    </tbody></table>

                
            </div>
        )
    }
}

export default StudentPeople;