import React from "react";
import styled from "styled-components";
import propTypes from "prop-types";
import Label from "../Label/Label";
import Input from "../Input/Input";

const InputField = styled.div`
  display: block;
  position: relative;
  &:first-child {
    margin-top: 2rem;
  }
  &:not(:last-of-type) {
    margin-bottom: 2rem;
  }
  & > Label {
  }
`;

const inputField = props => {
  return (
    <InputField>
      <Input name={props.name} value={props.value} onChange={props.onChange} />
      <Label isRequired={props.isRequired}>{props.label}</Label>
    </InputField>
  );
};

inputField.propTypes = {
  label: propTypes.string,
  onChange: propTypes.func,
  value: propTypes.string,
  name: propTypes.string,
  isRequired: propTypes.bool
};

export default inputField;
