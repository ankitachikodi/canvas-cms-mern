import React, { Component } from "react";
import axios from "axios";
import lib from "./../isLogin"
export default class Course extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseID: "",
      courseName: "",
      courseDept: "",
      courseRoom: "",
      courseCapacity: "",
      waitlistCapacity: "",
      courseTerm: "",
      fa_mail:lib.getUser().email
    };
  }

  onCoureseCreateHandler = (e) => {
    console.log("In Handler");
    e.preventDefault();
    const courseData = {
      courseID: this.state.courseID,
      courseName: this.state.courseName,
      courseDept: this.state.courseDept,
      courseRoom: this.state.courseRoom,
      courseCapacity: this.state.courseCapacity,
      waitlistCapacity: this.state.waitlistCapacity,
      courseTerm: this.state.courseTerm,
      fa_mail: this.state.fa_mail
    };
    console.log(courseData);
    axios.post('http://localhost:3001/createcourses ', courseData)
      .then(response => {
        console.log(response.body);
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          this.setState({
            authFlag: true,
            courseAdded: true,

          })
        } else {
          this.setState({
            authFlag: false,
            courseAdded: false
          })
        }
      });
  }
  render() {
    return (
      <div>
        <h3> Fill in Course Details to create a new course</h3>
        <br />
        <div class="form-group row">
          <form align="center">
          <div className="col-sm-10">
              <fieldset>
                Course ID
                <input
                  type="text"
                  name="Course ID"
                  onChange={e =>
                    this.setState({ courseID: e.target.value })
                  }
                />
                <br />
                <br />
                Course Name
                <input
                  type="text"
                  name="Course Name"
                  onChange={e =>
                    this.setState({ courseName: e.target.value })
                  }
                />
                <br />
                <br />
                Course Department
                <input
                  type="text"
                  name="Course Department"
                  onChange={e =>
                    this.setState({ courseDept: e.target.value })
                  }
                />
                <br />
                <br />
                Course Room
                <input
                  type="text"
                  name="Course Room"
                  onChange={e =>
                    this.setState({ courseRoom: e.target.value })
                  }
                />
                <br />
                <br />
                Course Capacity
                <input
                  type="text"
                  name="Course Capacity"
                  onChange={e =>
                    this.setState({ courseCapacity: e.target.value })
                  }
                />
                <br />
                <br />
                Waitlist Capacity
                <input
                  type="text"
                  name="Waitlist Capacity"
                  onChange={e =>
                    this.setState({ waitlistCapacity: e.target.value })
                  }
                />
                <br />
                <br />
                Course Term
                <input
                  type="text"
                  name="Course Term"
                  onChange={e =>
                    this.setState({ courseTerm: e.target.value })
                  }
                />
                <br />
                <br />
                <button
                  onClick={this.onCoureseCreateHandler}
                  type="button"
                  class="btn btn-primary"
                >
                  Create New Course
                </button>
              </fieldset>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
