import React from "react";
import "./MainNav.css";
import { Link } from "react-router-dom";
import * as routes from "../../constants/routes";

const mainNav = () => {
  return (
    <div className="mainNav">
      <div className="navLinks">
        <Link className="link" to={routes.LANDING}>Gigs</Link>
        <Link className="link" to={routes.LOCATIONS}>Locations</Link>
      </div>
    </div>
  );
};
export default mainNav;
