import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import * as routes from './../../constants/routes';
import SignInPage from './../SignIn';

const LandingPage = () =>
  <div>
    <h1>Welcome to bandmangger</h1>
    <p>The Landing Page is open to everyone, even though the user isn't signed in.</p>
    <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />

  </div>
  

export default LandingPage;
