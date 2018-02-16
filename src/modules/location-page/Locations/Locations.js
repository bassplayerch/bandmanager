import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import ContentContainer from "./../../../layout/ContentContainer/ContentContainer";
import styled from "styled-components";
import PlacesSearchWrapper from "./../../../layout/PlacesSearchWrapper/PlacesSearchWrapper";
import InputField from "./../../../components/InputField/InputField";
import Button from "./../../../components/Button/Button";

class Locations extends Component {
  state = {
    mapsAddress: ""
  };
  componentDidMount() {}

  handleFormSubmit = e => {
    e.preventDefault();
    geocodeByAddress(this.state.mapsAddress)
      .then(results => {
        console.log(results);
        return getLatLng(results[0]);
      })
      .then(latLng => console.log("Success", latLng))
      .catch(error => console.error("Error", error));
  };

  onValueChange = e => {
    // this.setState({ mapsAddress: val });
    console.log(e.target.value);
  };

  render() {
    return (
      <ContentContainer>
        <form onSubmit={this.handleFormSubmit}>
          {/* <PlacesSearchWrapper
            value={this.state.mapsAddress}
            onChange={this.onValueChange.bind(this)}
          /> */}
          <InputField onChange={this.onValueChange.bind(this)} label="gwag" />
          <InputField
            onChange={this.onValueChange.bind(this)}
            label="garbage"
          />
          <InputField onChange={this.onValueChange.bind(this)} label="müll" />
          <InputField onChange={this.onValueChange.bind(this)} label="gag" />
          <InputField
            onChange={this.onValueChange.bind(this)}
            label="bunnyyy"
          />
          <Button block type="submit">
            Submit
          </Button>
        </form>
      </ContentContainer>
    );
  }
}

export default withRouter(Locations);
