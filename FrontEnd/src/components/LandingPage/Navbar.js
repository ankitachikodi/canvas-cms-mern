import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

//create the Navbar Component
class Navbar extends Component {
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    //handle logout to destroy the cookie
    handleLogout = () => {
        cookie.remove('cookie', { path: '/' })
    }
    render(){
        //if Cookie is set render Logout Button
        let navLogin = null;
        if(cookie.load('cookie')){
            console.log("Able to read cookie");
            navLogin = (
                <ul class="nav navbar-nav ">
                <nav class="navbar fixed-bottom navbar-light bg-light"></nav>
                        <li><Link to="/" onClick = {this.handleLogout}><span class="glyphicon glyphicon-user"></span>Logout</Link></li>
                </ul>
            );
        }else{
            //Else display login button
            console.log("Not Able to read cookie");
            navLogin = (
                <ul class="nav navbar-nav">
                        <li class="active"><Link to="/login"><span class="glyphicon glyphicon-log-in"></span> Login</Link></li>
                </ul>
            )
        }
        let redirectVar = null;
        if(cookie.load('cookie')){
            redirectVar = <Redirect to="/home"/>
        }
        return(
            <div class="nav flex-column nav-pills">
                {redirectVar}
            <nav class="navbar navbar-inverse">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <a class="navbar-brand" href="#">SJSU CANVAS</a>
                    </div>
                    <ul class="nav navbar-nav">
                        <li ><Link to="/profile">Profile</Link></li>
                        {/*<li><Link to="/login">Sign in</Link></li>*/}
                        <li><Link to="/register">Sign up</Link></li>
                        
                    </ul>
                    {navLogin}
                </div>
            </nav>
        </div>
        )
    }
}

export default Navbar;