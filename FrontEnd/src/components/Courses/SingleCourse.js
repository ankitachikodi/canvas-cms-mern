import React, { Component } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import lib from './../isLogin';
import Assignments from './../Assignments/ViewAssignment'
import SubmitAssignment from './../Assignments/StudentSubmitAssignment'
import CreateAssignment from './../Assignments/AssignmentFaculty'
import ViewAssignment from "./../Assignments/ViewAssignment";
import StudentPeople from "../People/StudentPeople";
import Announcements from "./../Announcement";
import Grade from "./../Grade";
import Quiz from "./../Quiz/CreateQuiz";

// import QuizButton from "./../Quiz/CreateQuizButton";
import TakeQuiz from "./../Quiz/TakeQuiz";



export default class SingleCourse extends Component {
    render() {

        return (
          <div className="row">
            <div className="col-md-2 text-left">
              <ul class="list-group">
                <li class="list-group-item">Home</li>
                <li class="list-group-item">Files</li>
                <li class="list-group-item">
                  <Link
                    to={`/courses/${
                      this.props.match.params.courseId
                    }/assignments`}
                  >
                    Assignments
                  </Link>
                </li>
                <li class="list-group-item">
                  <Link
                    to={`/courses/${
                      this.props.match.params.courseId
                    }/all`}
                  >
                    People
                  </Link>
                </li>
                <li class="list-group-item">
                  <Link
                    to={`/courses/${
                      this.props.match.params.courseId
                    }/announcements`}
                  >
                    Announcements
                  </Link>
                </li>

                <li class="list-group-item">
                  <Link
                    to={`/courses/${
                      this.props.match.params.courseId
                    }/quiz`}
                  >
                    Quizzes
                  </Link>
                </li>
                <li class="list-group-item">
                  <Link
                    to={`/courses/${
                      this.props.match.params.courseId
                    }/grades`}
                  >
                    Grades
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-md-10 text-left">
              <Switch>
                <Route
                  path="/courses/:courseId/assignments/:assignmentId/submit"
                  render={props => <SubmitAssignment {...props} />}
                />
                <Route
                  path="/courses/:courseId/assignments/create"
                  render={props => <CreateAssignment {...props} />}
                />
                <Route
                  path="/courses/:courseId/assignments"
                  render={props => <ViewAssignment {...props} />}
                />
                <Route
                  path="/courses/:courseId/assignments/:assignmentId/submit"
                  render={props => <SubmitAssignment {...props} />}
                />
                <Route
                  path="/courses/:courseId/all"
                  render={props => <StudentPeople {...props} />}
                />
                <Route
                  path="/courses/:courseId/announcements"
                  render={props => <Announcements {...props} />}
                />
                {/* <Route path="/courses/:courseId/quiz" render={(props) => <Quiz {...props} />}></Route> */}
                <Route
                  path="/courses/:courseId/quiz"
                  render={props => <TakeQuiz {...props} />}
                />
                <Route
                  path="/courses/:courseId/grades"
                  render={props => <Grade {...props} />}
                />
              </Switch>
            </div>
          </div>
        );


        return (<div>Hello {((this.props.match||{}).params||{}).courseId} </div>)
    }
}