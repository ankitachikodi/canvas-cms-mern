import React, { Component } from "react";
import axios from "axios";
//import Image from "react-bootstrap/Image";
//import profileImage from "./BlankProfile.png";
import { Redirect } from 'react-router-dom';
import cookie from "react-cookies";
import cookie2 from "react-cookies";
import Axios from "axios";
import lib from './../isLogin'; 
class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state =
            {
                name: "",
            email: lib.getUser().email,
                phoneno: "",
                aboutme: "",
                city: "",
                country: "",
                school: "",
                hometown: "",
                gender: "",
                selectedPic: null,
                postedDataToEdit: false,
            type: lib.getUser().type

            };
    }

    handleChange = (e) => {
        //TO HANDLE MULTIPLE CHANGES
        // check it out: we get the e.target.name (which will be either "email" or "password")
        // and use it to target the key on our `state` object with the same name, using bracket syntax
        this.setState({ [e.target.name]: e.target.value });
    }
    componentDidMount() {
        console.log("IDHAR AATA BHI HAI")
        const { email } = this.state;
        const { type } = this.state;
        console.log("Email: ---  " + email);
        console.log("TypeOfUser: --- " + type);
        Axios.get('http://localhost:3001/displayProfile', { params: { email: email, type: type } })
            .then(response => {
                let user = response.data.data;
                console.log("USEeerERerererERe EDIT MEIN HAI", user)
                if (response.status == 200) {
                    this.setState(
                        {
                            name: user.Name,
                            email: user.Email,
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



    submitButtonHandler = (e) => {
        e.preventDefault();
        const data = {
            name: this.state.name,
            email: this.state.email,
            type: this.state.type,
            phoneno: this.state.phoneno,
            aboutme: this.state.aboutme,
            city: this.state.city,
            country: this.state.country,
            school: this.state.school,
            hometown: this.state.hometown,
            gender: this.state.gender,
            // selectedPic: this.state.selectedPic
        }
        console.log("editButton: ",this.state);

        Axios.post("http://localhost:3001/editProfile", this.state).then(response => {
            console.log("inside axios of display post");
            console.log("Status Code : ", response.status);

            if (response.status === 200) {
                this.setState({
                    dataEdited: true
                });
            }
            else {
                this.setState({
                    dataEdited: false
                });
            }
        });

    }

    render() {

        return (
          <div>
            <div class="row">
              <div class="profile-header-container">
                <div class="profile-header-img">
                  <img
                    class="img-circle"
                    src="//lh3.googleusercontent.com/-6V8xOA6M7BA/AAAAAAAAAAI/AAAAAAAAAAA/rzlHcD0KYwo/photo.jpg?sz=120"
                  />

                  <div class="rank-label-container">

                
                    <span class="label label-default rank-label"> Edit Profile Picture</span> 
                  </div>
                </div>
              </div>
            </div>
            <form>
              <fieldset>
                {/*<Image src={profileImage} rounded />*/}
                {/* <button onClick = {this.editButtonHandler}> Edit </button><br /> */}
                
                <table align="center">
                  <tr>
                    <td>Name</td>
                    <td>
                      <input
                        type="text"
                        onChange={this.handleChange}
                        value={this.state.name}
                        name="name"
                      />
                    </td>
                  </tr>
                  <br />
                  <tr>
                    <td>Email</td>
                    <td>
                      <input
                        type="text"
                        value={this.state.email}
                        name="email"
                        readOnly
                      />
                    </td>
                  </tr>
                  <br />
                  <tr>
                    <td>Phone Number</td>
                    <td>
                      <input
                        type="text"
                        onChange={this.handleChange}
                        value={this.state.phoneno}
                        name="phoneno"
                      />
                    </td>
                  </tr>
                  <br />
                  <tr>
                    <td>About Me</td>
                    <td>
                      <input
                        type="text"
                        onChange={this.handleChange}
                        value={this.state.aboutme}
                        name="aboutme"
                      />
                    </td>
                  </tr>
                  <br />
                  <tr>
                    <td>City</td>
                    <td>
                      <input
                        type="text"
                        onChange={this.handleChange}
                        value={this.state.city}
                        name="city"
                      />
                    </td>
                  </tr>
                  <br />
                  <tr>
                    <td>Country</td>
                    <td>
                      <input
                        type="text"
                        onChange={this.handleChange}
                        value={this.state.country}
                        name="country"
                      />
                    </td>
                  </tr>
                  <br />
                  <tr>
                    <td>School</td>
                    <td>
                      <input
                        type="text"
                        onChange={this.handleChange}
                        value={this.state.school}
                        name="school"
                      />
                    </td>
                  </tr>
                  <br />
                  <tr>
                    <td>Home Town</td>
                    <td>
                      <input
                        type="text"
                        onChange={this.handleChange}
                        value={this.state.hometown}
                        name="hometown"
                      />
                    </td>
                  </tr>
                  <br />
                  <tr>
                    <td>Gender</td>
                    <td>
                      <input
                        type="text"
                        onChange={this.handleChange}
                        value={this.state.gender}
                        name="gender"
                      />
                    </td>
                  </tr>
                </table>
                <br />
                <button onClick={this.submitButtonHandler}>
                  {" "}
                  Submit changes{" "}
                </button>
                <br />
              </fieldset>
            </form>
          </div>
        );
    }
}

export default EditProfile;