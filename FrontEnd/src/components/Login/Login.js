import React, {Component} from 'react';
import {Redirect} from 'react-router';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import lib from "./../isLogin";
import {Link} from 'react-router-dom';
//Define a Login Component
class Login extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            email : "",
            password : "",
            authFlag : false,
            type: ""
        
        }
        //Bind the handlers to this class
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        this.setState({
            authFlag : false
        })
    }
    //email change handler to update state variable with the text entered by the user
    emailChangeHandler = (e) => {
        this.setState({
            email : e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password : e.target.value
        })
    }
    checkHandler = (e) =>{
        if(e.target.value === 'Student'){
        this.setState({
            isStudent : true,
            isFaculty:false,
            type:"Student"
        })
    }else{
        this.setState({
            isFaculty : true,
            isStudent:false,
            type:"Faculty"
        })
    }
    }
    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            email : this.state.email,
            password : this.state.password,
            type: this.state.type
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/login',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if (
                  response.status === 200 &&
                  !!response.data &&
                  !!response.data.data &&
                  !!response.data.data.email
                ) {
                  let email = response.data.data.email;
                  localStorage.setItem("email", email);
                  localStorage.setItem(
                    "type",
                    response.data.data.type
                  );
                  this.props.history.push("/");
                } else {
                  this.setState({
                    authFlag: false
                  });
                }
            });
    }

    render(){
        //redirect based on successful login
        let redirectVar = null;
        if (lib.isLogin()){
            redirectVar = <Redirect to= "/"/>
        }
        return (
          <div>
            {redirectVar}
            {/* <image src="https://www.galionschools.org/blog/2017/09/13/galion-families-invited-to-learn-schools-new-learning-management-system" style={{margin-left:520px; height:100px; width:100px;}}></image> */}
           
            <div class="container">
              {/* <image src="https://www.galionschools.org/blog/2017/09/13/galion-families-invited-to-learn-schools-new-learning-management-system" style="margin-left:520px; height:100px; width:100px;"></image> */}

              <div className="sign-form" style={{ "margin-bottom": "-1px",
	  "border-bottom-left-radius": "0",
	  "border-bottom-right-radius":"0"}}>
                <div className="main-div">
                  <div className="panel">
                    <h2>Canvas Login</h2>
                    <p>Please enter your email and password</p>
                  </div>

                  <div className="form-group">
                    <input
                      onChange={this.emailChangeHandler}
                      type="text"
                      className="form-control"
                      name="email"
                      placeholder="email"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      onChange={this.passwordChangeHandler}
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Password"
                    />
                  </div>
                  <div>
                    <p>
                      <label className="radio-inline">
                        <input
                          type="radio"
                          name="rb"
                          onClick={this.checkHandler}
                          value="Student"
                        />
                        Student
                      </label>
                    </p>
                    <p>
                      <label className="radio-inline">
                        <input
                          type="radio"
                          name="rb"
                          onClick={this.checkHandler}
                        />
                        Faculty
                      </label>
                    </p>
                  </div>
                            
                            <button type="button" className="btn btn-primary"
                    onClick={this.submitLogin}
                    class="btn btn-primary"
                  >
                    Login
                  </button>
                </div>
              </div>
              <Link to="/register">Not Registered? Create a New user</Link>
            </div>
          </div>
        );
    }
}
//export Login Component
export default Login;