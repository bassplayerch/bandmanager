import React from "react";
import styled from "styled-components";
import propTypes from "prop-types";
import PlacesAutocomplete from "react-places-autocomplete";

const PlacesSearchWrapper = styled.div`
  width: 100%;
  .search-input {
    width: 100%;
    box-sizing: border-box;
  }

  .search-autocomplete-container {
  }
`;

const placesSearchWrapper = props => {
  const inputProps = {
    value: props.value,
    onChange: props.onChange
  };
  return (
    <PlacesSearchWrapper>
      <PlacesAutocomplete
        classNames={{
          input: "search-input",
          autocompleteContainer: "search-autocomplete-container"
        }}
        inputProps={inputProps}
      />
    </PlacesSearchWrapper>
  );
};

placesSearchWrapper.propTypes = {
  value: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired
}

export default placesSearchWrapper;
