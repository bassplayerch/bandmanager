import React, { Component } from "react";
import "./Home.css";
import Gigs from './../Gigs';

import withAuthorization from "../Session/withAuthorization";
import { db } from "../../firebase";

class HomePage extends Component {
  componentDidMount() {}

  render() {
    return (
      <div className="homePage">
        <Gigs />
      </div>
    );
  }
}

export default HomePage;
