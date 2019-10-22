import React, { Component } from "react";
import { Route, BrowserRouter,Switch } from "react-router-dom";
import { Redirect } from 'react-router';
import axios from "axios";
import lib from './../isLogin';
import Sidebar from "./Sidebar";
import DisplayProfile from "./../Profile/DisplayProfile";
import EditProfile from "../Profile/EditProfile";
import SearchCourses from "../Courses/SearchCourses";
import EnrollCourses from "../Courses/ViewCourses";
import CourseHome from "../Courses/CourseHome";
import SingleCourse from "../Courses/SingleCourse";
import Course from "../Courses/course";

import ViewDropCourses from "../Courses/ViewDropCourses";






export default class Dashboard extends Component {
    render() {
        let redirectVar = null;
        if (lib.isLogin()) {
            redirectVar = <Redirect to="/login" />;
        }
        return (
            <div>
                {redirectVar}
                <BrowserRouter>
                    <div className="wrapper">
                        <Sidebar />
                        <div id="content">
                            <div className="container-fluid">
                                <Switch>
                                    <Route path="/profile" render={(props)=><DisplayProfile {...props}/>}></Route>
                                    <Route path="/editProfile" render={(props) => <EditProfile {...props}/>}></Route>
                                    <Route path="/courses/:courseId" render={(props) => <SingleCourse {...props} />}></Route>
                                    <Route path="/courses" render={(props) => <CourseHome {...props} />}></Route>
                                    <Route path="/createcourses" render={(props) => <Course {...props} />}></Route>
                                    <Route path="/searchcourses" render={(props) => <SearchCourses {...props} />}></Route>
                                    <Route path="/viewcourses" render={(props) => <EnrollCourses {...props} />}></Route>
                                    <Route path="/viewcourses" render={(props) => <EnrollCourses {...props} />}></Route>
                                    <Route path="/viewcourses" render={(props) => <EnrollCourses {...props} />}></Route> 
                                    <Route path="/ViewDropCourses" render={(props) => <ViewDropCourses {...props} />}></Route>
                                </Switch>
                            </div>
                        </div>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}