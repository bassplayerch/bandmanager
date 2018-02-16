import React from "react";
import styled from "styled-components";
import propTypes from "prop-types";
import ReactSelect from "react-select";
import './MultiSelect.css';

const MultiSelect = styled(ReactSelect)`
    margin-bottom: 2rem;
`;

const multiSelect = props => {
  return <MultiSelect {...props}>{props.children}</MultiSelect>;
};

export default multiSelect;
