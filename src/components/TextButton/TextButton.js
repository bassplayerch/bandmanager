import React from "react";
import styled from "styled-components";
import propTypes from "prop-types";

const TextButton = styled.a`
  color: ${props => props.color || props.theme.colorSuccess};
  border: none;
  display: inline-block;
  font-weight: 400;
  cursor: pointer;
  &:hover {
    font-weight: bold;
    border-bottom: 1x solid currentColor;
  }
`;

const textButton = props => {
  return (
    <TextButton color={props.color} onClick={props.clickHandler}>
      {props.children}
    </TextButton>
  );
};

textButton.propTypes = {
  color: propTypes.string,
  clickHandler: propTypes.func.isRequired
};

export default textButton;
