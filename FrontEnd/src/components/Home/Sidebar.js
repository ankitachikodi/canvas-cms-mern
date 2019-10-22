import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import lib from './../isLogin';
export default class Sidebar extends Component {
    render() {
        return (
          <nav id="sidebar">
            <div className="sidebar-header">
              <h4>SJSU | {lib.isFaculty() ? 'Faculty' : 'Student'}</h4>
            </div>

            <ul className="list-unstyled components">
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/courses">Courses</Link>
              </li>
              {
                !lib.isFaculty() && 
                <li>
                  <Link to="/searchcourses">Enrollment</Link>
                </li>
              }
              
            
            </ul>

            <ul className="list-unstyled CTAs">
              <li>
                <Link to="/login">
                  Logout
                </Link>
              </li>
            </ul>
          </nav>
        );
    }
}