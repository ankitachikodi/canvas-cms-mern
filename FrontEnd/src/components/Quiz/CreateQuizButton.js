import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import cookie2 from 'react-cookies';
import { Redirect } from 'react-router';
import Axios from 'axios';
import lib from './../isLogin';
// import CreateQuiz from './CreateQuiz';

class CreateQuizButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: lib.getUser()['email'],
            type: lib.getUser()['type'],
            courses: []
        }
    }

    

    render() {


        return (
          // <div> {lib.isFaculty() && <button type="button" className="btn btn-primary btn-sm" style={{ marginLeft: "30px" }}>
          //     <Link to="/createquiz">
          //         Make New Announcement
          //       </Link>
          // </button>}

          // </div>
          <div>
            <form>
              <h3> Create Announcement</h3> <br /> <br />
              Title <br />
              <input type="text" /> <br /> <br />
              <div className="col">
                Message
                <input type="text" className="form-control" />
              </div>{" "}
              <br /> <br />
              <button type="button" class="btn btn-primary">
                Create Announcement
              </button>
            </form>
          </div>
        );

    }

}
export default CreateQuizButton;