import React, { Component } from 'react';
import cookie from 'react-cookies';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import lib from "./../isLogin";
class DisplayQuiz extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courseID: ((this.props.match || {}).params || {}).courseId,

            userType: lib.getUser().type,
            studentName: "",
            studentMail: lib.getUser().email
        }
    }
render(){
    return (
      <div className="container">
        <br />
        <b>
          2. Which of the following HTTP Status code means NOT MODIFIED,
          used to reduce network bandwidth usage in case of conditional GET
          requests?
        </b>

        <div className="radio">
          <label>
            <input type="radio" name="optradio" checked />
            200
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" name="optradio" />
            201
          </label>
        </div>
        <div className="radio disabled">
          <label>
            <input type="radio" name="optradio" />
            204
          </label>
        </div>
        <div className="radio disabled">
          <label>
            <input type="radio" name="optradio" />
            304
          </label>
        </div>
        <br />

        <button type="button" class="btn btn-primary btn-sm">
          Save and Next
        </button>
        <br />
        <br />
        <button type="button" class="btn btn-primary btn-sm">
          
          Submit
        </button>
        {/* a.<input type="radio" value >  </input>
        b.<input type="radio"> POST </input>
        c.<input type="radio"> PUT </input>
        d.<input type="radio"> HEAD </input> */}
      </div>
    );
}
    }
export default DisplayQuiz;