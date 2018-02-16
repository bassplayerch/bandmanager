import React, { Component } from "react";
import Fab from "./../../../components/Fab/Fab";
import { Link, withRouter } from "react-router-dom";
import Select from "react-select";
import "react-select/dist/react-select.css";
import Popup from "react-popup";
import DayPickerInput from "./../../../components/DayPicker/DayPicker";
import "react-day-picker/lib/style.css";
import * as Routes from "./../../../constants/routes";
import InputField from "./../../../components/InputField/InputField";
import ContentContainer from "./../../../layout/ContentContainer/ContentContainer";
import Button from "./../../../components/Button/Button";
import {
  getLocations,
  addGig,
  getGig,
  updateGig,
  getLocation
} from "../../../firebase/db";
import MomentLocaleUtils, {
  formatDate,
  parseDate
} from "react-day-picker/moment";
import "moment/locale/de";

class EditGigPage extends Component {
  state = {
    locations: [],
    edit: false,
    loading: false,
    gigId: "",
    selectedOption: "",
    location: "",
    date: "",
    startTime: "",
    endTime: "",
    comments: ""
  };

  componentDidMount = () => {
    if (this.getUrlParameter("id")) {
      this.setState({ edit: true });
      getGig(this.getUrlParameter("id"))
        .once("value")
        .then(data => {
          let newGig = data.val();
          this.setState({ gigId: data.key });
          this.changeDay(newGig.date);
          let newValues = JSON.parse(JSON.stringify(this.state));
          newValues.comments = newGig.comments;
          newValues.startTime = newGig.startTime;
          newValues.endTime = newGig.endTime;
          this.setState({ endTime: newGig.endTime }) 
          this.setState({ startTime: newGig.startTime }) 
          this.setState({ comments: newGig.comments }) 
            getLocation(newGig.location)
              .once("value")
              .then(loc => {
                if (loc.val()) {
                  this.onChangeLocationHandler({
                    label: loc.val().name,
                    value: newGig.location
                  });
                }
              });
        })
        .catch(err => console.log("there was an error loading the gig, ", err));
    }
    this.setState({ loading: true });
    getLocations().on("value", data => {
      this.setState({ loading: true });
      let allLocations = data.val();
      let locationsArr = [];
      if (allLocations) {
        Object.keys(allLocations).forEach(location => {
          locationsArr.push({
            id: location,
            name: allLocations[location].name
          });
        });
        this.setState({ locations: locationsArr, loading: false });
      }
    });
  };

  getUrlParameter = name => {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    let regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    let results = regex.exec(window.location.search);
    return results === null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  };

  handleChange(e) {
    const attrName = e.target.name;
    const value = e.target.value;
    this.setState({ [attrName]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.location && this.state.date) {
      if (this.state.edit) {
        let postData = {
          comments: this.state.comments,
          date: this.state.date,
          startTime: this.state.startTime,
          endTime: this.state.endTime,
          location: this.state.location
        };
        updateGig(this.state.gigId, postData)
          .then(data => {
            this.props.history.push(Routes.LANDING);
          })
          .catch(err =>
            console.log("there was an error updating the gig", err)
          );
      } else {
        addGig({
          date: this.state.date,
          location: this.state.location,
          startTime: this.state.startTime,
          endTime: this.state.endTime,
          comments: this.state.comments
        })
          .then(data => {
            this.props.history.push(Routes.LANDING);
          })
          .catch(err => console.log("there was an error adding the gig", err));
      }
    } else {
      alert("please fill out all the required forms");
    }
  }

  onChangeLocationHandler = selectedOption => {
    console.log(selectedOption);
    if (selectedOption) {
      this.setState({ selectedOption });
      this.state.locations.forEach(location => {
        if (location.id === selectedOption.value) {
          this.setState({ location: location.id });
        }
      });
    } else {
    }
  };

  changeDay(day) {
    this.setState({ date : formatDate(day, "LL", "de") });
  }

  setDayPickerValue = val => {
    return val || null;
  };

  render() {
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
          <form className="editGigForm" onSubmit={this.handleSubmit.bind(this)}>
            <label>
              Location *:
              <Select
                name="location"
                value={value}
                onChange={this.onChangeLocationHandler}
                options={selectOptions}
              />
            </label>
            <DayPickerInput
              placeholder="Date *"
              value={this.state.date}
              onDayChange={this.changeDay.bind(this)}
            />
            <label />
            <InputField
              value={this.state.startTime}
              onChange={this.handleChange.bind(this)}
              pattern="([01]?[0-9]{1}|2[0-3]{1}):[0-5]{1}[0-9]{1}"
              label="Starttime"
              name="startTime"
            />
            <InputField
              value={this.state.endTime}
              onChange={this.handleChange.bind(this)}
              pattern="([01]?[0-9]{1}|2[0-3]{1}):[0-5]{1}[0-9]{1}"
              label="Endtime"
              name="endTime"
            />
            <InputField
              value={this.state.comments}
              onChange={this.handleChange.bind(this)}
              label="Comments"
              name="comments"
            />
            <Button block type="submit">
              Submit
            </Button>{" "}
          </form>
        </ContentContainer>
      );
    }
  }
}

export default withRouter(EditGigPage);
