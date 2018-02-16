import React from "react";
import styled from "styled-components";
import propTypes from "prop-types";

const Label = styled.label`
    font-size: 1.3rem;
    position: absolute;
    top: 0;
    bottom: 15x;
    left: 1rem;
    transition: all .3s;
    font-size: 1.4rem;
`;

const label = props => {
  return <Label>{props.children}</Label>;
};

export default label;
