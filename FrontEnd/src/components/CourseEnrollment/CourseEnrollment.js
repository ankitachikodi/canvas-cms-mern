import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';

class CourseEnrollment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            term: '',
            waitlistNo: '',
            email: cookie.load('email'),
            courseID: cookie.load('courseID'),
            enroll:''
        }
    }


    EnrollData = e => {
        this.setState({
            enroll: e.target.value
        })
        const { email, courseID, term } = this.state;
        console.log(email);
        axios.post('http://localhost:3001/enrolled', { email, courseID, term })
            .then(response => {
                if (response.data === true) {
                    alert("Student Enrolled");
                    window.location.reload();
                }

            })

    }

    componentDidMount() {
        axios.get('http://localhost:3001/availableCourses')
            .then((response) => {
                console.log(response.data);
                this.setState({
                    courses: this.state.courses.concat(response.data)
                });
            });
    }

    render() {
        let courseDetails = this.state.courses.map(course => {
            return (

                <tr>
                    <td>{course.courseID}</td>
                    <td>{course.courseCapacity}</td>
                    <td>{course.waitlistNo}</td>
                    <td>{course.term}</td>

                    <td><button name="enrollCourse" onClick={this.EnrollData.bind(this)} >Enroll Course</button></td>
                    {/* <td><button key={course.courseID} value="W" name="waitlistCourse" id="waitlistCourse" >Waitlist</button></td> */}

                </tr>

            )
        })
        return (
            <div>
               
                <div id="enrollCoursemain">
                    <table className="tableEnroll" border="0|1">
                        <thead>
                            <tr>
                                <th>Course ID</th>
                                <th>Course Capacity</th>
                                <th>Waitlist</th>
                                <th>Term</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courseDetails}
                        </tbody>
                    </table>


                </div>

            </div>
        );
    }
}

export default CourseEnrollment;
