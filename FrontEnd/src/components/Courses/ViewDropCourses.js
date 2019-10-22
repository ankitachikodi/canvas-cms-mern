import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import Axios from "axios";
import cookie from 'react-cookies';
import cookie2 from 'react-cookies';
import { Redirect } from 'react-router';
import Sidebar from '../Home/Sidebar';
import lib from '../isLogin';

//Define a Login Component
class ViewDropCourses extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            email: lib.getUser().email,

            //  type: cookie2.load('type'),
            courseNumber: "",
            courseName: "",
            term: "",
            courseID: "",
            category: "",
            categoryVal: '',
            isChanged: false,
            selectedVal: "",
            searchCompleted: "false",
            searchResults: [],
            isDropped: '',
            viewCourses: ""

        }


    }

    //Get data
    componentDidMount() {
        console.log("Did mount of view drop courses");
        const { email } = this.state;
        //const {type} = this.state;
        console.log("Email: " + email);
        //console.log("TypeOfUser: "+type);
        Axios.get('http://localhost:3001/ViewDropCourses', { params: { email } })
            .then(response => {
                //   const parsedResponse = JSON.parse(res); --------------> This does not workfor reading response
                // console.log("Response data:"+response.data[0].name);  ---------> This works. Since only 1 array of response is received, we are using response[0]
                console.log("inside axios of View drop Courses");
                console.log("Status Code : ", response.status);
                console.log("response Data:", response.data);
                if (response.status === 200) {
                    this.setState({
                        searchCompleted: true,
                        searchResults: this.state.searchResults.concat(response.data)
                    });

                }
                else {
                    this.setState({
                        searchCompleted: false
                    });
                }

            });

    }

    viewEnrolledHandler = (e) => {
        this.setState({
            viewCourses: true
        })
    }

    dropHandler = (searchResult, e) => {
        this.state.searchResults = [];
        console.log("SearchResult: " + JSON.stringify(searchResult));
        const data = {
            courseID: searchResult.courseID,
            email: this.state.email
        }
        console.log("Data: " + data.courseID + "Student email: " + data.email);
        axios.post("http://localhost:3001/ViewDropCourses", data).then(response => {
            console.log("inside axios of Seacrh Courses");
            console.log("Status Code : ", response.status);
            console.log("response Data:", response.data);
            if (response.status === 200) {
                this.setState({
                    isDropped: true,
                    searchResults: this.state.searchResults.concat(response.data)
                });
                alert("Course Dropped");

            }
        });
    }


    render() {

        let search = this.state.searchResults.map(searchResult => {
            return (
                <tr>
                    <td align="center">{searchResult.courseID}</td>
                    <td align="center">{searchResult.courseName}</td>
                    <td align="center">{searchResult.courseDepartment}</td>
                    <td align="center">{searchResult.term}</td>
                    <td align="center">{searchResult.wait_no}</td>
                    <td align="center">{searchResult.fa_mail}</td>
                    <td align="center"><button className="btn btn-search" onClick={this.dropHandler.bind(this, searchResult)}> Drop </button><br /></td>
                </tr>

            )
        });
        //redirect based on successful login
        let redirectVar = null;
        let redirectVar1 = null;
        if (cookie.load('cookie')) {
            redirectVar = <Redirect to="/ViewDropCourses" />
            if (this.state.isDropped === true) {
                redirectVar1 = <Redirect to="/ViewDropCourses" />
            }
        }

        return (
            <div>
                {redirectVar}
                {redirectVar1}
                <Sidebar />
                <div class="view-courses">
                    <h2>Courses Enrolled</h2>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Course ID</th>
                                <th>Course Name</th>
                                <th>Department</th>
                                <th>Course Term</th>
                                <th>Waitlist Position</th>
                                <th>Faculty Contact</th>
                                <th>Drop Course</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/Display the Table row based on data recieved/}
                            {search}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
//export Login Component
export default ViewDropCourses;
