import React, { Component } from "react";
import Fab from "./../../../components/Fab/Fab";
import "./Locations.css";
import { Link, withRouter } from "react-router-dom";
import Select from "react-select";
import "react-select/dist/react-select.css";
import Popup from "react-popup";
import ContentContainer from './../../../layout/ContentContainer/ContentContainer';
import {
  getLocationsRef,
  addLocation,
  deleteLocation,
  updateLocation
} from "../../../firebase/db";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

class Locations extends Component {
  state = {
    locations: [],
    editMode: false,
    oldName: "",
    loading: false,
    selectedOption: "",
    formValues: {
      name: "",
      country: "",
      city: "",
      address: "",
      contactPerson: "",
      website: "",
      lng: "",
      lat: "",
      zipcode: "",
      mapsAdress: ""
    }
  };
  componentDidMount = () => {
    this.setState({ loading: true });
    getLocationsRef().on("value", data => {
      this.setState({ loading: true });
      let allLocations = data.val();
      let locationsArr = [];
      if (allLocations) {
        Object.keys(allLocations).forEach(location => {
          locationsArr.push({
            id: location,
            address: allLocations[location].address,
            city: allLocations[location].city,
            contactPerson: allLocations[location].contactPerson,
            country: allLocations[location].country,
            name: allLocations[location].name,
            website: allLocations[location].website,
            zipcode: allLocations[location].zipcode,
            mapsAdress: allLocations[location].mapsAdress,
            lng: allLocations[location].lng,
            lat: allLocations[location].lat
          });
        });

        //set input field state:
        this.setState({ locations: locationsArr, loading: false });
      }
    });
  };

  deleteLocationHandler = () => {
    Popup.create({
      title: null,
      content:
        "Do you really want to delete this location? This change cannot be reverted",
      buttons: {
        left: [
          {
            text: "Cancel",
            className: "success",
            action: () => {
              Popup.close();
            }
          }
        ],
        right: [
          {
            text: "Delete",
            className: "danger",
            action: () => {
              deleteLocation(this.state.selectedOption.value)
                .then(data => console.log(data, "location deleted"))
                .catch(err => console.log(err, " couldn't delete location"));
              Popup.close();
            }
          }
        ]
      }
    });
  };

  handleChange(event) {
    let newValues = JSON.parse(JSON.stringify(this.state.formValues));
    newValues[event.target.getAttribute("name")] = event.target.value;
    this.setState({ formValues: newValues });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!this.state.formValues.mapsAdress) {
      alert("please choose a maps address");
    }
    if (this.state.formValues.mapsAdress) {
      geocodeByAddress(this.state.formValues.mapsAdress)
        .then(results => getLatLng(results[0]))
        .then(loc => {
          if (this.state.editMode) {
            getLocationsRef()
              .orderByChild("name")
              .equalTo(this.state.oldName)
              .on("child_added", d => {
                let key = d.key;
                console.log(key);
                let postData = {
                  name: this.state.formValues.name,
                  country: this.state.formValues.country,
                  city: this.state.formValues.city,
                  address: this.state.formValues.address,
                  contactPerson: this.state.formValues.contactPerson,
                  website: this.state.formValues.website,
                  zipcode: this.state.formValues.zipcode,
                  lat: loc.lat,
                  lng: loc.lng,
                  mapsAdress: this.state.formValues.mapsAdress
                };
                updateLocation(key, postData)
                  .then(data => {
                    console.log("location updated", data);
                    this.resetForm();
                  })
                  .catch(err =>
                    console.log("there was an error adding the location", err)
                  );
              });
          } else {
            addLocation({
              name: this.state.formValues.name,
              country: this.state.formValues.country,
              city: this.state.formValues.city,
              address: this.state.formValues.address,
              contactPerson: this.state.formValues.contactPerson,
              website: this.state.formValues.website,
              zipcode: this.state.formValues.zipcode,
              lat: loc.lat,
              lng: loc.lng,
              mapsAdress: this.state.formValues.mapsAdress
            })
              .then(data => {
                console.log("location added", data);
                this.resetForm();
              })
              .catch(err =>
                console.log("there was an error adding the location", err)
              );
          }
        })
        .catch(error => console.error("Error", error));
    }
  }

  onChangeLocationHandler = selectedOption => {
    this.setState({ editMode: true });
    if (selectedOption) {
      this.setState({ oldName: selectedOption.label });
      this.setState({ selectedOption });
      this.state.locations.forEach(location => {
        if (location.id === selectedOption.value) {
          let newFormValues = {
            name: location.name,
            country: location.country,
            city: location.city,
            address: location.address,
            contactPerson: location.contactPerson,
            website: location.website,
            zipcode: location.zipcode,
            lat: location.lat,
            lng: location.lng,
            mapsAdress: location.mapsAdress
          };
          console.log(newFormValues);
          this.setState({ formValues: newFormValues });
        }
      });
    } else {
      this.deleteLocationHandler();
    }
  };

  onAddLocationHandler = () => {
    this.setState({ editMode: false });
    this.resetForm();
  };

  resetForm = () => {
    this.setState({
      selectedOption: "",
      editMode: "false",
      formValues: {
        name: "",
        country: "",
        city: "",
        address: "",
        contactPerson: "",
        website: "",
        zipcode: "",
        mapsAdress: ""
      }
    });
  };

  onMapsChange = adress => {
    let newValues = JSON.parse(JSON.stringify(this.state.formValues));
    newValues.mapsAdress = adress;
    console.log(adress);
    this.setState({ formValues: newValues });
  };

  render() {
    const inputProps = {
      value: this.state.formValues.mapsAdress,
      onChange: this.onMapsChange
    };

    const defaultStyles = {
      root: {
        width: "99%",
        margin: "0 auto",
        marginTop: "2rem",
        display: "flex",
        flexDirection: "column"
      },
      input: {
        display: "inline-block",
        maxWidth: "97.9%",
        padding: "10px"
      },
      autocompleteContainer: {
        position: "absolute",
        top: "100%",
        backgroundColor: "white",
        border: "1px solid #555555",
        width: "100%"
      },
      autocompleteItem: {
        backgroundColor: "#ffffff",
        padding: "10px",
        color: "#555555",
        cursor: "pointer"
      },
      autocompleteItemActive: {
        backgroundColor: "#fafafa"
      }
    };

    const { selectedOption } = this.state;
    const value = selectedOption && selectedOption.value;

    let selectOptions = this.state.locations.map(location => {
      return {
        value: location.id,
        label: location.name
      };
    });

    if (this.state.loading) {
      return <h1>LOADING</h1>;
    } else {
      return (
        <ContentContainer>
          {/* <Popup /> */}
          <h1>test</h1>
          <h1>test</h1>
          <h1>test</h1>
          <h1>test</h1>
          <h1>test</h1>
          <h1>test</h1>
          <h1>test</h1>
          {/* <Select
            name="form-field-name"
            value={value}
            onChange={this.onChangeLocationHandler}
            options={selectOptions}
          /> */}

          {/* <form
            className="locationForm"
            onSubmit={this.handleSubmit.bind(this)}
          >
            <label>
              Name *:
              <input
                required
                type="text"
                name="name"
                value={this.state.formValues.name}
                onChange={this.handleChange.bind(this)}
              />
            </label>
            <label>
              Location Picker *:
              <PlacesAutocomplete
                styles={defaultStyles}
                inputProps={inputProps}
              />
            </label>
            <label>
              Country:
              <input
                type="text"
                name="country"
                value={this.state.formValues.country}
                onChange={this.handleChange.bind(this)}
              />
            </label>
            <label>
              City:
              <input
                type="text"
                name="city"
                value={this.state.formValues.city}
                onChange={this.handleChange.bind(this)}
              />
            </label>
            <label>
              Zip Code:
              <input
                type="number"
                name="zipcode"
                value={this.state.formValues.zipcode}
                onChange={this.handleChange.bind(this)}
              />
            </label>
            <label>
              Address:
              <input
                type="text"
                name="address"
                value={this.state.formValues.address}
                onChange={this.handleChange.bind(this)}
              />
            </label>
            <label>
              Website:
              <input
                type="text"
                name="website"
                value={this.state.formValues.website}
                onChange={this.handleChange.bind(this)}
              />
            </label>
            <label>
              Contact Person:
              <input
                type="text"
                name="contact person"
                value={this.state.formValues.contactPerson}
                onChange={this.handleChange.bind(this)}
              />
            </label>

            <input type="submit" value="Submit" />
          </form> */}
          {/* <Fab clickHandler={this.onAddLocationHandler}>
            <i className="material-icons">note_add</i>
          </Fab> */}
        </ContentContainer>
      );
    }
  }
}

export default withRouter(Locations);
