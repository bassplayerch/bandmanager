import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import * as routes from './../../constants/routes';
import SignInPage from './../SignIn';
import {SIGN_IN} from '../../constants/routes'

const LandingPage = () => (
  <div>
    <h1>Test123</h1>
    <div style={{ background: "black" }}>
    <Link className="link" to={routes.SIGN_UP}>
        Sign Up
      </Link>
      <Link className="link" to={routes.SIGN_IN}>
        Sign in
      </Link>
    </div>
  </div>
);
  

export default LandingPage;
