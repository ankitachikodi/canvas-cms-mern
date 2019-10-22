import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';

//Define a Login Component
class QuizCreation extends Component {
    
    constructor(props) {
        
        super(props);
        this.state = {
            isCreated: false,
            //fmail: cookie.load('email'),
            // cid: "",
            // sub: "",
            // term: "",

            questions: [],
            correct: '',
            possibleAnsOne: '',
            possibleAnsTwo: '',
            possibleAnsThree: '',
            isPublished:false
             // usertype: cookie.load('usertype')

        }
        // console.log("The faculty mail is:"+this.state.fmail);
        //Bind the handlers to this class
        this.quizCreate = this.quizCreate.bind(this);
        
    }


    quizCreate = (e) => {
        e.preventDefault();
        const data = {

            correct: this.state.correct,
            possibleAnsOne: this.state.possibleAnsOne,
            possibleAnsTwo: this.state.possibleAnsTwo,
            possibleAnsThree: this.state.possibleAnsThree,
            questions: this.state.questions
        }
        axios.post("http://localhost:3001/QuizCreated", data).then(response => {
           
            console.log("Status Code : ", response.status);
            console.log("response Data:", response.data);
            if (response.status === 200) {
                this.setState({
                    isCreated: true
                    // obtResults : this.state.obtResults.concat(response.data) 
                });

            }
        })
    }

    


    render() {

        // let displayAnnouncement = this.state.obtResults.map(obtResult => {
        //     return (

        //         <tr>
        //             <td align="center">{obtResult.fac_mail}</td>
        //             <td align="center">{obtResult.courseid}</td>
        //             <td align="center">{obtResult.subject}</td>
        //             <td align="center">{obtResult.message}</td>
        //             <td align="center">{obtResult.courseterm}</td>
        //         </tr>
        //     )
        // })
        // let redirectVar = null;
        // if (cookie.load('cookie')) {
        //     redirectVar = <Redirect to="/createAnnouncement" />
        // }
        return (
            <div>
                {redirectVar}
                <div class="container">
                    <div class="login-form">
                        <div class="main-div">
                            <div class="panel">
                                <h3>Create Quiz</h3>
                            </div>

                            <div class="form-group">
                                <tr>
                                    <label>Question</label>
                                    <input type="text" onChange={(e) => { this.setState({ questions: e.target.value }) }} placeholder="Please Enter your question here" ></input>
                                </tr><br />
                                <tr>
                                    <label>Correct Answer</label>
                                    <input type="text" onChange={(e) => { this.setState({ correct: e.target.value }) }}></input>
                                </tr><br />
                                <tr>
                                    <label>Possible Answer 1</label>
                                    <input type="text" onChange={(e) => { this.setState({ possibleAnsOne: e.target.value }) }}></input>
                                </tr><br />
                                <tr>
                                    <label>Possible Answer 2</label>
                                    <input type="text" onChange={(e) => { this.setState({ possibleAnsTwo: e.target.value }) }}></input>
                                </tr><br />
                                <tr>
                                    <label>Possible Answer 3</label>
                                    <input type="text" onChange={(e) => { this.setState({ possibleAnsThree: e.target.value }) }}></input>
                                </tr><br />
                                <tr>
                                    <button onClick={this.quizCreate}>Add Question</button>
                                    {/* <button onClick={this.viewMessages}>View Announcements</button> */}
                                </tr>
                            </div>

                        </div>
                    </div>
                </div>


                {/* <div class="container">
                    <h2>Announcements</h2>
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Faculty Mail</th>
                                <th>Course ID</th>
                                <th>Subject</th>
                                <th>Message</th>
                                <th>Term</th>

                            </tr>
                        </thead>
                        <tbody>

                            {displayAnnouncement}
                        </tbody>
                    </table>
                </div> */}

            </div>
        )
    }
}
export default QuizCreation;