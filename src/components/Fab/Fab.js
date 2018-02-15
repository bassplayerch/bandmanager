import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";

const Fab = styled.button`
  cursor: pointer;
  background: ${props => props.backgroundColor || props.theme.colorPrimary};
  color: white;
  border: none;
  border-radius: 100%;
  padding: 0rem;
  width: 5rem;
  height: 5rem;
  font-weight: 300;
  display: block;
  text-align: center;
  position: absolute;
  transform: translateY(0);
  left: ${props => props.left || null};
  right: ${props => props.right || '3rem'};
  top: ${props => props.top || null};
  bottom: ${props => props.bottom || '3rem'};
  z-index: 10;
  transition: all 0.3s;

  &:hover {
    background: ${props => props.backgroundColorHover || props.theme.colorPrimaryDark};
    box-shadow: ${props => props.theme.boxShadowMedium};
    transform: translateY(-2px);
  }
  &:active {
    transform: translateY(0);
  }
`;

const fab = props => {
  return (
    <Fab
      onClick={props.clickHandler}
      className="fab"
      backgroundColor={props.backgroundColor}
      top={props.top}
      right={props.right}
      bottom={props.bottom}
      left={props.left}
    >
      {props.children}
    </Fab>
  );
};

fab.propTypes = {
  clickHandler: propTypes.func,
  backgroundColor: propTypes.string,
  backgroundColorHover: propTypes.string,
  top: propTypes.string,
  left: propTypes.string,
  bottom: propTypes.string,
  right: propTypes.string,
};

export default fab;
