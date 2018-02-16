import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navigation from "../Navigation";
import LandingPage from "../Landing";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import PasswordForgetPage from "../PasswordForget";
import HomePage from "../Home";
import AccountPage from "../Account";
import Layout from "../../components/Layout/Layout";
import withAuthentication from "../Session/withAuthentication";
import * as routes from "../../constants/routes";
import { ThemeProvider } from "styled-components";
import { lighten, darken } from "polished";

const theme = {
  colorPrimary: "#BB2F3D",
  colorGreyLight: "#faf9f9",
  colorGreyMedium: "#dddddd",
  colorGreyMediumDark: "#848484",
  colorWhite: "#ffffff",
  colorSecondary: "#333333",
  colorSuccess: "#306330",
  colorDanger: "#d9534f",
  boxShadowMedium: "0 1rem 3rem rgba(0,0,0,.2)",
  boxShadowLight: "0 2rem 4rem rgba(0, 0, 0, .1)"
};
theme.colorPrimaryLight = lighten(0.1, theme.colorPrimary);
theme.colorPrimaryDark = darken(0.08, theme.colorPrimary);
theme.colorGreyLightest = lighten(0.02, theme.colorGreyLight);

class App extends Component {
  state = {
    authUser: false
  };
  componentDidMount() {
  }

  render() {
    return (
      <Router>
        <ThemeProvider theme={theme}>
          <Layout />
        </ThemeProvider>
      </Router>
    );
  }
}
export default withAuthentication(App);
