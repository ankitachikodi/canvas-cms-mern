import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import lib from './../isLogin';

import { Redirect } from 'react-router';
class ViewCourses extends Component {

    constructor(props) {
        super(props);
        this.state = {
            stemail: lib.getUser().email,
            waitListPosition: 0,
            viewCourses: '',
            isHidden: ''
        }
    }

    viewEnrolledHandler = (e) => {
        this.setState({
            viewCourses: true
        })
    }

    enrollHandler = (searchResult) => {
        console.log("SearchREsult >>>>>>>>>>>>>>>>>>>>>>", searchResult)
        return  (e)=>{
            e.preventDefault();
            const data = {
                courseID: searchResult.courseID,
                facultyemail: searchResult.fa_mail,
                courseTerm: searchResult.courseTerm,
                stemail: this.state.stemail
            }
            console.log("Data: enroll " , data);
            axios.post("http://localhost:3001/EnrollCourses", data).then(response => {
                console.log("inside axios of Seacrh Courses");
                console.log("Status Code : ", response.status);
                console.log("response Data:", response.data);
                if (response.status === 200 && response.data === "Already enrolled") {
                    // this.setState({
                    //     isEnrolledAlready: true
                    // });
                    console.log("You are already enrolled to this course!");

                }
                else if (response.status === 200 && response.data === "Waitlist full") {
                    // this.setState({
                    //     isEnrolled: false
                    // });
                    console.log("The class capacity and waitlist capacity for this course are full. Cannot enroll students to this course!");
                }
                else if (response.status === 200 && response.data === "Enrolled") {
                    this.setState({
                        isEnrolled: true
                    });

                    console.log("You have now been enrolled to this course!");
                }
                else if (response.status === 200) {
                    this.setState({
                        isWaitlisted: true
                    })
                    this.state.waitListPosition = response.data;
                    console.log(" " + response.data);
                }
            });

        }
        
          
        

        
           
      //  this.state.waitListPosition = 0;

        // this.setState({
        //     isHidden: "hidden"
        // })
        
    }

    render() {
        let redirectVar1 = null;
        if (this.state.viewCourses === true) {
            redirectVar1 = <Redirect to="/ViewDropCourses" />;
            console.log("Redirect to ViewDrop");
        }
        else if (this.state.isEnrolled === true) {
            redirectVar1 = <Redirect to="/SearchCourses" />;
            //redirectVar1 = <DisplayCourses searchResults={ this.props.searchResults } />
            console.log("Redirect to SearchCourses");
        }
        else if (this.state.isWaitlisted === true) {
            redirectVar1 = <Redirect to="/SearchCourses" />;
            console.log("Redirect to SearchCourses");
        }

        

        console.log("Inside render of display");
        return (

            <div>
                {redirectVar1}
                <div class="container">
                    <h2>Courses Available</h2>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Course ID</th>
                                <th>Course Name</th>
                                <th>Department</th>
                                <th>Capacity</th>
                                {/* <th>Current Capacity</th> */}
                                <th>Waitlist Capacity</th>
                                <th>Course Term</th>
                                <th> Enroll </th>
                                {/* <th>Faculty Contact</th> */}
                            </tr>
                        </thead>
                        <tbody>

                            {this.props.searchResults.map(searchResult => {
                                return (
                                    <tr>
                                        <td align="center">{searchResult.courseID}</td>
                                        <td align="center">{searchResult.courseName}</td>
                                        <td align="center">{searchResult.courseDept}</td>
                                        <td align="center">{searchResult.courseCapacity}</td>
                                        {/* <td align="center">{searchResult.currentWaitlist}</td> */}
                                        <td align="center">{searchResult.waitlistCapacity}</td>
                                        <td align="center">{searchResult.courseTerm}</td>
                                        {/* <td align="center">{searchResult.facultyemail}</td> */}
                                        <td align="center"><button type="button" class="btn btn-primary btn-sm" onClick={this.enrollHandler(searchResult)}> Enroll </button><br /></td>
                                    </tr>

                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div class="container">
                    <button type="button" class="btn btn-primary btn-sm" onClick={this.viewEnrolledHandler}> Your Courses </button><br />
                </div>
            </div>
        )
    }
}

export default ViewCourses;