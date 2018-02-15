import React from "react";
import "./MainNav.css";
import { NavLink } from "react-router-dom";
import * as routes from "../../../constants/routes";

const mainNav = () => {
  return (
    <div className="mainNav">
      <div className="navLinks">
        <NavLink exact activeStyle={{background:'#BB2F3D'}} className="link" to={routes.LANDING}>Gigs</NavLink>
        <NavLink exact activeStyle={{background:'#BB2F3D'}} className="link" to={routes.LOCATIONS}>Locations</NavLink>
      </div>
    </div>
  );
};
export default mainNav;
