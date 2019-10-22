import React, { Component } from 'react';
import cookie from 'react-cookies';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import lib from "./../isLogin";
class CreateQuiz extends Component {
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
          <div>
            <h3>Create Quiz </h3>
            <br />
            <form>
              <div className="row">
                <div className="col">
                  Question
                  <input type="text" className="form-control" />
                </div>
                <br />
                <div className="col-md-3 mb-3">
                  Correct Answer <br />
                  <input type="text" className="form-control" /> <br />
                  Possible Answer 1 <br />
                  <input type="text" className="form-control" /> <br />
                  Possible Answer 2 <br />
                  <input type="text" className="form-control" /> <br />
                  Possible Answer 3 <br />
                  <input type="text" className="form-control" /> <br />
                  <div
                    class="btn-group mr-2"
                    role="group"
                    aria-label="First group"
                  >
                    <button class="btn btn-primary" type="submit">
                      Add Next
                    </button>
                  </div>
                  <div
                    class="btn-group"
                    role="group"
                    aria-label="First group"
                  > 
                  <button class="btn btn-primary" type="submit">
                    Submit
                  </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        );}
}
export default CreateQuiz;