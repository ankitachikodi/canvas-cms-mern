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
            studentMail: lib.getUser().email,
            quiz: [{
                Title: 'Quiz 1',
                
            }, {
                Title: 'Quiz 2',

            }],
        }
    }

    render() {
        let quizSelect = this.state.quiz.map(x => {
            return (
              <tr>
                <td>
                  <p>
                    <b>{x.Title}</b>
                  </p>
                </td>
                <td>
                  <p>
                    <button type="button" class="btn btn-primary">
                      Take Quiz
                    </button>
                  </p>
                </td>
              </tr>
            );
        })

        return (
            <div class="container" >
                <h3>Quiz Section</h3>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Available Quizzes</th>              
                        </tr>
                    </thead>
                    <tbody>{quizSelect}</tbody>
                </table>
            </div>
        );
    }
}
           
export default DisplayQuiz;