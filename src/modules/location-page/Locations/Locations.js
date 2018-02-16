import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Fab from "./../../../components/Fab/Fab";
import Popup from "react-popup";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";
import ContentContainer from "./../../../layout/ContentContainer/ContentContainer";
import styled from "styled-components";
import PlacesSearchWrapper from "./../../../layout/PlacesSearchWrapper/PlacesSearchWrapper";
import InputField from "./../../../components/InputField/InputField";
import Button from "./../../../components/Button/Button";
import MultiSelect from "./../../../components/MultiSelect/MultiSelect";
import {
  addLocation,
  getLocations,
  deleteLocation,
  updateLocation
} from "../../../firebase/db";

class Locations extends Component {
  state = {
    editMode: false,
    name: "",
    lat: "",
    lng: "",
    mapsAddress: "",
    streetNumber: "",
    street: "",
    city: "",
    country: "",
    countryCode: "",
    zipCode: "",
    state: "",
    stateCode: "",
    website: "",
    contactPerson: "",
    selectedOption: "",
    locations: []
  };
  componentDidMount() {
    getLocations().on("value", res => {
      const result = res.val();
      let locations = Object.keys(result).map(locId => {
        return {
          id: locId,
          ...result[locId]
        };
      });
      this.setState({ locations });
    });
  }

  onLocationAdded = e => {
    e.preventDefault();
    if (!this.state.name) {
      alert("please enter a name");
      return;
    }
    const newLocation = {
      name: this.state.name,
      lat: this.state.lat,
      lng: this.state.lng,
      streetNumber: this.state.streetNumber,
      street: this.state.street,
      city: this.state.city,
      country: this.state.country,
      countryCode: this.state.countryCode,
      zipCode: this.state.zipCode,
      state: this.state.state,
      stateCode: this.state.stateCode,
      website: this.state.website,
      contactPerson: this.state.contactPerson
    };
    if (this.state.editMode) {
      updateLocation(this.state.selectedOption.value, newLocation)
        .then(() => {
          console.log("location updated");
          this.resetForm();
          this.setState({ editMode: false, selectedOption: "" });
        })
        .catch(err => console.log("error while updating location", err));
    } else {
      addLocation(newLocation)
        .then(() => {
          console.log("location added");
          this.resetForm();
          this.setState({ selectedOption: "" });
        })
        .catch(err => console.log("error while adding the location", err));
    }
  };

  onValueChange = e => {
    const attrName = e.target.name;
    const value = e.target.value;
    this.setState({ [attrName]: value });
  };
  onMapsAddresChange = val => {
    this.setState({ mapsAddress: val });
  };

  onSelectMapPlace = address => {
    this.setState({ mapsAddress: address });
    geocodeByAddress(address)
      .then(results => {
        this.resetForm();
        this.parseAddress(results);
        return getLatLng(results[0]);
      })
      .then(latLng => {
        this.setState({ lat: latLng.lat, lng: latLng.lng });
      })
      .catch(error => console.error("Error", error));
  };

  resetForm() {
    this.setState({
      name: "",
      lat: "",
      lng: "",
      mapsAddress: "",
      streetNumber: "",
      street: "",
      city: "",
      country: "",
      countryCode: "",
      zipCode: "",
      state: "",
      stateCode: "",
      website: "",
      contactPerson: ""
    });
  }

  parseAddress = results => {
    let arrAddress = results[0].address_components;
    for (let ac = 0; ac < arrAddress.length; ac++) {
      if (arrAddress[ac].types[0] === "street_number") {
        this.setState({ streetNumber: arrAddress[ac].long_name });
      }
      if (arrAddress[ac].types[0] === "route") {
        this.setState({ street: arrAddress[ac].short_name });
      }
      if (arrAddress[ac].types[0] === "locality") {
        this.setState({ city: arrAddress[ac].long_name });
      }
      if (arrAddress[ac].types[0] === "administrative_area_level_1") {
        this.setState({ state: arrAddress[ac].long_name });
      }
      if (arrAddress[ac].types[0] === "administrative_area_level_1") {
        this.setState({ stateCode: arrAddress[ac].short_name });
      }
      if (arrAddress[ac].types[0] === "postal_code") {
        this.setState({ zipCode: arrAddress[ac].long_name });
      }
      if (arrAddress[ac].types[0] === "country") {
        this.setState({ country: arrAddress[ac].long_name });
      }
      if (arrAddress[ac].types[0] === "country") {
        this.setState({ countryCode: arrAddress[ac].short_name });
      }
    }
  };

  onChangeLocation = selectedOption => {
    if (!selectedOption) {
      this.deleteLocation(this.state.selectedOption.value, this);
      return;
    }
    this.setState({ selectedOption, editMode: true });
    this.setInputFields(selectedOption.value);
  };

  deleteLocation = (id, that) => {
    Popup.create({
      title: null,
      content:
        "Do you really want to delete this location? This change cannot be reverted and gigs using this location will have an undefined location",
      buttons: {
        left: [
          {
            text: "Cancel",
            className: "success",
            action: function() {
              Popup.close();
            }
          }
        ],
        right: [
          {
            text: "Delete",
            className: "danger",
            action: function() {
              deleteLocation(id)
                .then(() => {
                  console.log("location deleted");
                  that.resetForm();
                  that.setState({ selectedOption: "" });
                })
                .catch(err =>
                  console.log("error while deleting location", err)
                );
              Popup.close();
            }
          }
        ]
      }
    });
  };

  setInputFields = id => {
    const newLocation = this.state.locations.filter(loc => loc.id === id)[0];
    Object.keys(newLocation).forEach(loc => {
      this.setState({ [loc]: newLocation[loc] });
    });
  };

  onNewLocationClicked = () => {
    this.resetForm();
    this.setState({ editMode: false, selectedOption: "" });
  };

  render() {
    const { selectedOption } = this.state;
    const value = selectedOption && selectedOption.value;
    const selectOptions = this.state.locations.map(loc => {
      return {
        value: loc.id,
        label: loc.name
      };
    });
    return (
      <ContentContainer>
        <MultiSelect
          value={value}
          onChange={this.onChangeLocation}
          options={selectOptions || []}
        />
        <form onSubmit={this.onLocationAdded}>
          <PlacesSearchWrapper
            value={this.state.mapsAddress}
            onChange={this.onMapsAddresChange.bind(this)}
            onSelect={this.onSelectMapPlace}
          />
          <InputField
            value={this.state.name}
            onChange={this.onValueChange.bind(this)}
            label="Name"
            name="name"
            isRequired
          />
          <InputField
            value={this.state.country}
            onChange={this.onValueChange.bind(this)}
            label="Country"
            name="country"
          />
          <InputField
            value={this.state.countryCode}
            onChange={this.onValueChange.bind(this)}
            label="Country Code"
            name="countryCode"
          />
          <InputField
            value={this.state.city}
            onChange={this.onValueChange.bind(this)}
            label="City"
            name="city"
          />
          <InputField
            value={this.state.zipCode}
            onChange={this.onValueChange.bind(this)}
            label="Zip Code"
            name="zipCode"
          />
          <InputField
            value={this.state.street}
            onChange={this.onValueChange.bind(this)}
            label="Street"
            name="street"
          />
          <InputField
            value={this.state.streetNumber}
            onChange={this.onValueChange.bind(this)}
            label="Street Number"
            name="streetNumber"
          />
          <InputField
            value={this.state.state}
            onChange={this.onValueChange.bind(this)}
            label="State"
            name="state"
          />
          <InputField
            value={this.state.stateCode}
            onChange={this.onValueChange.bind(this)}
            label="State Abbreviation"
            name="stateCode"
          />
          <InputField
            value={this.state.website}
            onChange={this.onValueChange.bind(this)}
            label="Website"
            name="website"
          />
          <InputField
            value={this.state.contactPerson}
            onChange={this.onValueChange.bind(this)}
            label="Contact Person"
            name="contactPerson"
          />

          <Button block type="submit">
            Submit
          </Button>
        </form>
        <Fab clickHandler={this.onNewLocationClicked}>
          <i className="material-icons">note_add</i>
        </Fab>
        <Popup />
      </ContentContainer>
    );
  }
}

export default withRouter(Locations);
