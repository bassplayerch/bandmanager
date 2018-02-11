import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navigation from "../Navigation";
import LandingPage from "../Landing";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import PasswordForgetPage from "../PasswordForget";
import HomePage from "../Home";
import UserNav from "../UserNav";
import MainNav from "../MainNav";
import AccountPage from "../Account";
import withAuthentication from "../Session/withAuthentication";
import * as routes from "../../constants/routes";
import PropTypes from "prop-types";
import "./Layout.css";

const Layout = (props, { authUser }) => {
  let content = null;
  if (authUser) {
    content = (
      <div className="mainContainer">
        <UserNav />
        <div className="container">
          <MainNav />
          <Route exact path={routes.LANDING} component={() => <HomePage />} />
        </div>
      </div>
    );
  } else {
    content = (
      <Route exact path={routes.LANDING} component={() => <LandingPage />} />
    );
  }

  return (
    <div className="app">
      <div className="mainWrapper">{content}</div>
    </div>
  );
};

Layout.contextTypes = {
  authUser: PropTypes.object
};

const NavigationAuth = () => <h1>signed in</h1>;

const NavigationNonAuth = () => <h1>signed out</h1>;

export default Layout;

{
  /* <Navigation /> */
}
{
  /* <Route exact path={routes.LANDING} component={() => <LandingPage />} />
      <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
      <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
      <Route
        exact
        path={routes.PASSWORD_FORGET}
        component={() => <PasswordForgetPage />}
      />
      <Route exact path={routes.HOME} component={() => <HomePage />} />
      <Route exact path={routes.ACCOUNT} component={() => <AccountPage />} /> */
}
