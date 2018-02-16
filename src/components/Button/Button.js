import React from "react";
import styled from "styled-components";
import propTypes from "prop-types";

const Button = styled.button`
  border: none;
  cursor: pointer;
  background: ${props => props.theme.colorPrimary};
  padding: 1rem 2rem;
  width: ${props => (props.block ? "100%" : null)};
  border-radius: ${props => (props.round ? "10rem" : "0")};
  font-size: 1.4rem;
  text-transform: uppercase;
  color: ${props => props.theme.colorWhite};

  transition: all 0.3s;

  &:active {
    outline: none;
  }

  &:hover {
    background: ${props => props.theme.colorPrimaryDark};
    box-shadow: ${props => props.theme.boxShadowMedium};
  }
`;

const button = props => {
  return (
    <Button
      rounded={props.rounded}
      block={props.block}
      onClick={props.onClick}
    >
      {props.children}
    </Button>
  );
};

button.propTypes = {
  onClick: propTypes.func,
  rounded: propTypes.bool,
  block: propTypes.bool
};

export default button;
