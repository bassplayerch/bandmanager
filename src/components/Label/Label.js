import React from "react";
import styled from "styled-components";
import propTypes from "prop-types";

const Label = styled.label`
  font-size: 1.3rem;
  position: absolute;
  top: 0;
  bottom: 15x;
  left: 1rem;
  transition: all 0.3s;
  font-size: 1.4rem;
  color: ${props => props.theme.colorGreyMediumDark};
`;

const Required = styled.span`
  color: ${props => props.theme.colorDanger};
  font-size: 1.9rem;
  font-weight: bold;
`;

const label = props => {
  if (props.isRequired) {
    return (
      <Label>
        {props.children} <Required>*</Required>
      </Label>
    );
  } else {
    return <Label>{props.children}</Label>;
  }
};

label.propTypes = {
  isRequired: propTypes.bool
};

export default label;
