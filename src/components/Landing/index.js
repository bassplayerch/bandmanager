import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import * as routes from './../../constants/routes';
import SignInPage from './../SignIn';
import {SIGN_IN} from '../../constants/routes'

const LandingPage = () =>
  <div>
    <h1>Welcome to bandmangger</h1>
    <p>The Landing Page is open to everyone, even though the user isn't signed ihhn.</p>
    <Link className="link" to={routes.SIGN_IN}>Sign SIGN_In</Link>

  
  </div>
  

export default LandingPage;
