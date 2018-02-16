import React from "react";
import styled from "styled-components";
import propTypes from "prop-types";
import PlacesAutocomplete from "react-places-autocomplete";
import Label from "./../../components/Label/Label";

const PlacesSearchWrapper = styled.div`
  width: 100%;
  position: relative;
  .search-input {
    width: 100%;
    height: 4rem;
    font-family: inherit;
    font-size: 1.6rem;
    background-color: transparent;
    margin-bottom: 2rem;
    padding: 1rem 1rem;
    border: none;
    display: block;
    border-bottom: 1px solid ${props => props.theme.colorGreyMedium};
    &:focus {
      outline: none;
    }
    &:focus ~ Label,
    &:not(:placeholder-shown) ~ Label {
      font-size: 1rem;
      top: -1.5rem;
      left: 1rem;
    }
  }

  .search-autocomplete-container {
    background: red;
  }
`;

const placesSearchWrapper = props => {
  const inputProps = {
    value: props.value,
    onChange: props.onChange,
    placeholder: "Search place... "
  };
  return (
    <PlacesSearchWrapper>
      <PlacesAutocomplete
        classNames={{
          input: "search-input",
          autocompleteContainer: "search-autocomplete-container"
        }}
        inputProps={inputProps}
        onSelect={props.onSelect}
      />
      <Label>{props.label}</Label>
    </PlacesSearchWrapper>
  );
};

placesSearchWrapper.propTypes = {
  value: propTypes.string.isRequired,
  onSelect: propTypes.func.isRequired,
  onChange: propTypes.func
};

export default placesSearchWrapper;
