import React, { Component } from "react";

import "./App.css";
import Main from "./components/Main";
//import FirstPage from "./Components/firstPage";
//import SignIn from "./Components/signIn";
//import Course from "./Components/course";
//import UserProfile from "./Components/userProfile";
//import DisplayProfile from "./Components/displayProfile";
import {BrowserRouter} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
      <BrowserRouter>
      <div>
        <Main/>
        </div>
      </BrowserRouter>
       
      </div>
    );
  }
}

export default App;
