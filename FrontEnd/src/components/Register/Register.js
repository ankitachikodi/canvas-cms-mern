import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import lib from "./../isLogin";
import {Redirect} from 'react-router-dom';
// import {Link} from 'react-router-dom';
class Register extends React.Component{
constructor(props){
    super(props);
    this.state= {
        name : '',
        email : '',
        password : '',
        confirmpassword:'',
        isStudent : false,
        isFaculty : false,
        isRegistered : false,
        type : ''
    }
    //this.changeHandler = this.changeHandler.bind(this);
    // this.emailChangeHandler = this.emailChangeHandler.bind(this);
    // this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.submitRegister = this.submitRegister.bind(this);
}
componentWillMount(){
    this.setState({
        authFlag : false
    })
}
// // changeHandler=(e)=>{
// //     this.setState({
// //     name : e.target.value,
// // });
// console.log("This is within changeHandler");
// console.log(this.state.name);
// }
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
submitRegister = (e)=>{
    e.preventDefault();
    if(this.state.password === this.state.confirmpassword){
    const data={
        name : this.state.name,
        email: this.state.email,
        password : this.state.password,
        confirmpassword: this.state.confirmpassword,
        isStudent : this.state.isStudent,
        isFaculty : this.state.isFaculty,
        type: this.state.type
    }
    console.log("this is the data:"+ JSON.stringify(data,null,2));
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:3001/register',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    let email = response.data.data.email;
                    localStorage.setItem('email', email);
                    localStorage.setItem(
                      "type",
                      response.data.data.type
                    );
                    this.props.history.push("/");
                }else{
                    this.props.history.push("/register");
                }
            });
    }else{
        console.log("SHow Error")
    } 
}


render(){
    // let redirectVar = null;
    // if (!lib.isLogin()) {
    //     redirectVar = <Redirect to="/login" />
    // }
        

    return(
        <div>
           {/* {redirectVar} */}
        <div class="container">
          
            <div class="register-form">
                <div class="main-div">
                    <div class="panel">
                        <h2>Sign Up</h2>
                        <p>Please enter your details to create your account</p>
                    </div>
                    <div class="form-group">
                        <input onChange = {(e)=>{this.setState({name : e.target.value})}} type="text" class="form-control" name="name" placeholder="Name"/>
                    </div>
                    
                        <div class="form-group">
                            <input onChange = {(e)=>{this.setState({email : e.target.value})}} type="text" class="form-control" name="email" placeholder="name@example.com"/>
                        </div>
                        <div class="form-group">
                            <input onChange = {(e)=>{this.setState({password : e.target.value})}} type="password" class="form-control" name="password" placeholder="Password"/>
                        </div>
                        <div class="form-group">
                            <input onChange = {(e)=>{this.setState({confirmpassword : e.target.value})}} type="password" class="form-control" name="confirmpassword" placeholder="ConfirmPassword"/>
                        </div>
                        <div>
                        <p><label class="radio-inline">
                            <input type="radio" name="rb" onClick = {this.checkHandler} value="Student"/>
                            Student
                            </label></p>
                            <p><label class="radio-inline">
                            <input type="radio" name="rb" onClick = {this.checkHandler} />Faculty
                            </label></p>
                        </div>
                        <button onClick = {this.submitRegister} class="btn btn-primary"> Register</button>                 
                </div>
            </div>
        </div>
        </div>
    )
}
}

export default Register;