import React from "react";
import styled from "styled-components";
import propTypes from "prop-types";
import {darken} from 'polished'

const DeleteIcon = styled.span`
  color: ${props => props.theme.colorDanger};
  font-weight: bold;
  display: block;
  cursor: pointer;
  &:hover {
    color: ${(props) => darken(0.2, props.theme.colorDanger)};
    border-bottom: 1px solid currentColor;
  }
`;

const deleteIcon = props => {
  return (
    <DeleteIcon onClick={props.deleteClickHandler}>
      {propTypes.icon || "x"}
    </DeleteIcon>
  );
};

deleteIcon.propTypes = {
  deleteClickHandler: propTypes.func.isRequired,
  icon: propTypes.string
};

export default deleteIcon;
