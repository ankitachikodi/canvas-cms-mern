import React, {Component} from 'react';
import {Route,BrowserRouter} from 'react-router-dom';
import Login from './Login/Login';
import Register from "./Register/Register";
import Home from "./Home/Home";

class Main extends Component {
    render(){
        return (
          <BrowserRouter>
            <div>
              <Route
                exact
                path="/login"
                render={props => <Login {...props} />}
              />
              <Route
                exact 
                path="/register"
                render={props => <Register {...props} />}
              />
              <Route
                path="/"
                render={props => <Home {...props} />}
              />
            </div>
          </BrowserRouter>
        );
    }
}
//Export The Main Component
export default Main;


{/*Render Different Component based on Route
                
                <Route path="/login" component={Login}/>
                <Route path="/home" component={Home}/>
                <Route path="/delete" component={Delete}/>
                <Route path="/create" component={Create}/>*/}
{/* <Route path="/" component={Navbar}/>
                <Route path = "/register" component = {Register}/>
                <Route path="/login" component={Login}/>
                <Route path="/displayProfile" component={DisplayProfile}/> */}
{/* <Route path="/courseCreation" component={course} /> */ }
{/* <Route path="/courseEnrollment" component={courseEnrollment} /> */ }
{/* <Route path="/upload" component={assignmentFaculty} />
            <Route
              path="/viewAssignments"
              component={viewAssignments}
            />
            <Route path="/upload" component={assignmentFaculty} />
            <Route
              path="/assignmentSubmitStudent"
              component={assignmentSubmitStudent}
            /> */}
{/* <ReactPDF
              file={{ url: "http://localhost:3001/uploads/myfile.pdf" }}
            /> */}