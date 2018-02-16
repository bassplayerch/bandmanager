import React from "react";
import styled from "styled-components";
import propTypes from "prop-types";

const Input = styled.input`
  width: 100%;
  height: 4rem;
  font-family: inherit;
  font-size: 1.6rem;
  background-color: transparent;
  padding: 1rem 1rem;
  border: none;
  display: block;
  border-bottom: 1px solid ${props => props.theme.colorGreyMedium};
  &:focus {
    outline: none;
  }
  &:focus + Label,
  &:not(:placeholder-shown) + Label {
    font-size: 1rem;
    top: -1.5rem;
    left: 1rem;
  }
`;

const input = props => {
  return (
      <Input
        value={props.value}
        isRequired={props.isRequired}
        name={props.name}
        onChange={props.onChange}
        placeholder=" "
        pattern={props.pattern}
      />
  );
};

input.propTypes = {
  value: propTypes.str,
  onChange: propTypes.func,
  name: propTypes.string,
  pattern: propTypes.pattern
};

export default input;
