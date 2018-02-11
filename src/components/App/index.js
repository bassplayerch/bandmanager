import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from "../Navigation";
import LandingPage from "../Landing";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import PasswordForgetPage from "../PasswordForget";
import HomePage from "../Home";
import AccountPage from "../Account";
import Layout from "../Layout";
import withAuthentication from "../Session/withAuthentication";
import * as routes from "../../constants/routes";

import "./index.css";

class App extends Component {
  state = {
    authUser: false
  };
  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <Router>
        <Layout />
      </Router>
    );
  }
}
export default withAuthentication(App);
