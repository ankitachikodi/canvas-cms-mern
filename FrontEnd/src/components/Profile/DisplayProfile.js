import React, { Component } from "react";
import axios from "axios";
//import Image from "react-bootstrap/Image";
//import profileImage from "./BlankProfile.png";
import { Redirect } from 'react-router-dom';
import cookie from "react-cookies";
import cookie2 from "react-cookies";
import Axios from "axios";
import lib from './../isLogin'; 

class DisplayProfile extends Component {

    state =
        {
            name: "",
            email: lib.getUser().email,
            phoneNumber: "",
            aboutMe: "",
            city: "",
            country: "",
            company: "",
            school: "",
            homeTown: "",
            language: "",
            gender: "",
            selectedPic: null,
            postedDataToEdit: false,
            type: lib.getUser().type

        };
    componentDidMount() {
        const { email } = this.state;
        const { type } = this.state;
        console.log("Email: " + email);
        console.log("TypeOfUser: " + type);
        Axios.get('http://localhost:3001/displayProfile', { params: { email: email, type: type } })
            .then(response => {
                let user = response.data.data;
                console.log("USEeerERerererERe",user)
                if (response.status == 200) {
                    this.setState(
                        {
                            name: user.Name,
                            email: user.email,
                            phoneNumber: user.phoneNumber,
                            aboutMe: user.aboutMe,
                            city: user.city,
                            country: user.country,
                            company: user.company,
                            school: user.school,
                            homeTown: user.homeTown,
                            language: user.language,
                            gender: user.gender,
                            //    selectedPic: user.selectedPic
                        });

                }

            });

    }

    editButtonHandler = (e) => {
        e.preventDefault();
        this.props.history.push('/editProfile');

    }

    render() {

        // console.log("the cookie data is " + this.state.email);
        // let redirectVal = null;
        // if (this.state.postedDataToEdit === true) {
        //     redirectVal = <Redirect to="/editProfile" />
        // }
        // else {
        //     redirectVal = <Redirect to="/displayProfile" />
        // }

        return (
            <div>
                <div class="row">
                    <div class="profile-header-container">
                        <div class="profile-header-img">
                            <img class="img-circle" src="//lh3.googleusercontent.com/-6V8xOA6M7BA/AAAAAAAAAAI/AAAAAAAAAAA/rzlHcD0KYwo/photo.jpg?sz=120" />

                            <div class="rank-label-container">
                                
                            </div>
                        </div>
                    </div>
                </div>

                <form>
                    <fieldset >
                        <button onClick={this.editButtonHandler}> Edit Profile </button><br />
                        <br></br>
                        <table align="center">
                            <tr>
                                <td>Name</td>
                                <td><input type='text' value={this.state.name} name='name' readOnly /></td>
                                
                            </tr>
                            <br></br>
                            <tr>
                                <td>Email</td>
                                <td><input type='text' value={this.state.email} name='email' readOnly /></td>
                            </tr>
                            <br></br>
                            <tr>
                                <td>Phone Number</td>
                                <td><input type='text' value={this.state.phoneNumber} name='phoneno' readOnly /></td>
                            </tr>
                            <br></br>
                            <tr>
                                <td>About Me</td>
                                <td><input type='text' value={this.state.aboutMe} name='aboutme' readOnly /></td>
                            </tr>
                            <br></br>
                            <tr>
                                <td>City</td>
                                <td><input type='text' value={this.state.city} name='city' readOnly /></td>
                            </tr>
                            <br></br>
                            <tr>
                                <td>Country</td>
                                <td><input type='text' value={this.state.country} name='country' readOnly /></td>
                            </tr>
                            <br></br>
                            <tr>
                                <td>School</td>
                                <td><input type='text' value={this.state.school} name='school' readOnly /></td>
                            </tr>
                            <br></br>
                            <tr>
                                <td>Home Town</td>
                                <td><input type='text' value={this.state.homeTown} name='hometown' readOnly /></td>
                            </tr>
                            <br></br>
                            <tr>
                                <td>Gender</td>
                                <td><input type='text' value={this.state.gender} name='gender' readOnly /></td>
                            </tr>
                        </table>

                    </fieldset>
                </form>
            </div>
        );
    }
}

export default DisplayProfile;