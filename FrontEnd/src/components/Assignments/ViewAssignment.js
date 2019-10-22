import lib from '../isLogin'
import React from "react";
import AssignmentFaculty from "./AssignmentFaculty";
import {Link}  from "react-router-dom";
//import AssignmentSubmitStudent from "./AssignmentFaculty"
const axios = require("axios");

export default class ViewAssignment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseID: this.props.match.params.courseId,
      title: '',
      deadline: '',
       assignmentID: null,
       st_mail: '', 
        assignments:[]
    };
    // this.setAssignmentID = this.setAssignmentID.bind(this) 
  }

  componentDidMount(){

          axios.get('http://localhost:3001/viewAssignments?courseID=' +this.state.courseID)
              .then((response) => {
                  console.log(response.data);
                
                  this.setState({
                      assignments: response.data,
                     // assignmentID: this.state.assignmentID.concat(response.data)
                      
                  });
                  
                });
      }


  render() {
    return (
      <div>{lib.isFaculty() && <button type="button" className="btn btn-primary btn-sm" style={{ marginLeft: "30px" }}>
        <Link to={`/courses/${this.props.match.params.courseId}/assignments/create`}>
          Create Assignment
                  </Link>
      </button>}
      <div className="card">
        <div className="card-header"></div>
        {this.state.assignments.map(x => {
          return (
            
            <div>
              <div className="card-body">
                <h5 className="card-title">{x.title} </h5>
                <p className="card-text">{x.message}</p>
                <button type="button" className="btn btn-primary btn-sm">
                  <a href={`http://localhost:3001/${x.assignment_file}`} target="_blank">
                    View Assignment
                  </a>
                </button>
                {!lib.isFaculty() && <button type="button" className="btn btn-primary btn-sm" style={{ marginLeft: "30px" }}>
                  <Link to={`/courses/${this.props.match.params.courseId}/assignments/${x.assignment_id}/submit`}>
                    Submit Assignment
                  </Link>
                </button>}
              </div>
            </div>
          );
        })}
      </div>
      </div>
    );
  }
}

