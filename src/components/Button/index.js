import React from "react";
import "./Button.css";

const button = props => {
  return (
    <button onClick={props.clickHandler} style={props.styles} className="btn">
      {props.children}
    </button>
  );
};

export default button;
