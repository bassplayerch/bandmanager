import React from "react";
import dayPickerInput from "react-day-picker/DayPickerInput";
import propTypes from "prop-types";
import styled from "styled-components";
import './DayPicker.css';

const DayPicker = styled(dayPickerInput)`
 
`;

const dayPicker = props => {
  return (
    <DayPicker className="garbage" {...props} value={props.value} onDayChange={props.onDayChange}>
      {props.children}
    </DayPicker>
  );
};

export default dayPicker;
