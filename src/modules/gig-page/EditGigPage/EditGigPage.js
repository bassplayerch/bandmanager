// import React, { Component } from "react";
// import Fab from "./../../../components/Fab/Fab";
// import "./EditGigPage.css";
// import { Link, withRouter } from "react-router-dom";
// import Select from "react-select";
// import "react-select/dist/react-select.css";
// import Popup from "react-popup";
// import DayPickerInput from "react-day-picker/DayPickerInput";
// import "react-day-picker/lib/style.css";
// import * as Routes from "./../../../constants/routes";
// import {
//   getLocationsRef,
//   addGig,
//   getGig,
// updateGig,
//   getLocation
// } from "../../../firebase/db";
// import MomentLocaleUtils, {
//   formatDate,
//   parseDate
// } from "react-day-picker/moment";
// import "moment/locale/de";

// class EditGigPage extends Component {
//   state = {
//     locations: [],
//     edit: false,
//     loading: false,
//     gigId: '',
//     selectedOption: "",
//     formValues: {
//       location: "",
//       date: "",
//       startTime: "",
//       endTime: "",
//       comments: ""
//     }
//   };

//   componentDidMount = () => {
//     if (this.getUrlParameter("id")) {
//       this.setState({ edit: true });
//       getGig(this.getUrlParameter("id"))
//         .once("value")
//         .then(data => {
//           let newGig = data.val();
//           this.setState({gigId: data.key})
//           this.changeDay(newGig.date);
//           let newValues = JSON.parse(JSON.stringify(this.state.formValues));
//           newValues.comments = newGig.comments;
//           newValues.startTime = newGig.startTime;
//           newValues.endTime = newGig.endTime;
//           this.setState({ formValues: newValues }) ^
//             getLocation(newGig.location)
//               .once("value")
//               .then(loc => {
//                 if (loc.val()) {
//                   this.onChangeLocationHandler({
//                     label: loc.val().name,
//                     value: newGig.location
//                   });
//                 }
//               });
//         })
//         .catch(err => console.log("there was an error loading the gig, ", err));
//     }
//     this.setState({ loading: true });
//     getLocationsRef().on("value", data => {
//       this.setState({ loading: true });
//       let allLocations = data.val();
//       let locationsArr = [];
//       if (allLocations) {
//         Object.keys(allLocations).forEach(location => {
//           locationsArr.push({
//             id: location,
//             name: allLocations[location].name
//           });
//         });
//         this.setState({ locations: locationsArr, loading: false });
//       }
//     });
//   };

//   getUrlParameter = name => {
//     name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
//     let regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
//     let results = regex.exec(window.location.search);
//     return results === null
//       ? ""
//       : decodeURIComponent(results[1].replace(/\+/g, " "));
//   };

//   handleChange(event) {
//     let newValues = JSON.parse(JSON.stringify(this.state.formValues));
//     newValues[event.target.getAttribute("name")] = event.target.value;
//     this.setState({ formValues: newValues });
//   }

//   handleSubmit(event) {
//     event.preventDefault();
//     if (this.state.formValues.location && this.state.formValues.date) {
//       if (this.state.edit) {
//         let postData = {
//           comments: this.state.formValues.comments,
//           date: this.state.formValues.date,
//           startTime: this.state.formValues.startTime,
//           endTime: this.state.formValues.endTime,
//           location: this.state.formValues.location
//         }
//         updateGig(this.state.gigId, postData)
//         .then(data => {
//           this.props.history.push(Routes.LANDING);
//         })
//         .catch(err => console.log("there was an error updating the gig", err));
//       } else {
//         addGig({
//           date: this.state.formValues.date,
//           location: this.state.formValues.location,
//           startTime: this.state.formValues.startTime,
//           endTime: this.state.formValues.endTime,
//           comments: this.state.formValues.comments
//         })
//           .then(data => {
//             this.props.history.push(Routes.LANDING);
//           })
//           .catch(err => console.log("there was an error adding the gig", err));
//       }
//     } else {
//       alert("please fill out all the required forms");
//     }
//   }

//   onChangeLocationHandler = selectedOption => {
//     console.log(selectedOption);
//     if (selectedOption) {
//       this.setState({ selectedOption });
//       this.state.locations.forEach(location => {
//         if (location.id === selectedOption.value) {
//           let newValues = JSON.parse(JSON.stringify(this.state.formValues));
//           newValues.location = location.id;
//           this.setState({ formValues: newValues });
//         }
//       });
//     } else {
//     }
//   };

//   changeDay(day) {
//     let newValues = JSON.parse(JSON.stringify(this.state.formValues));
//     newValues.date = formatDate(day, "LL", "de");
//     this.setState({ formValues: newValues });
//   }

//   setDayPickerValue = val => {
//     return val || null;
//   };

//   render() {
//     const { selectedOption } = this.state;
//     const value = selectedOption && selectedOption.value;

//     let selectOptions = this.state.locations.map(location => {
//       return {
//         value: location.id,
//         label: location.name
//       };
//     });

//     if (this.state.loading) {
//       return <h1>LOADING</h1>;
//     } else {
//       return (
//         <div className="editGigContainer">
//           <form className="editGigForm" onSubmit={this.handleSubmit.bind(this)}>
//             <label>
//               Location *:
//               <Select
//                 name="location"
//                 value={value}
//                 onChange={this.onChangeLocationHandler}
//                 options={selectOptions}
//               />
//             </label>
//             <label>
//               Date *:
//               <DayPickerInput
//                 styles={{ background: "red" }}
//                 value={this.state.formValues.date}
//                 onDayChange={this.changeDay.bind(this)}
//               />
//             </label>
//             <label />
//             <label>
//               Starttime:
//               <input
//                 type="text"
//                 name="startTime"
//                 pattern="([01]?[0-9]{1}|2[0-3]{1}):[0-5]{1}[0-9]{1}"
//                 value={this.state.formValues.startTime}
//                 onChange={this.handleChange.bind(this)}
//               />
//             </label>
//             <label>
//               Endtime:
//               <input
//                 type="text"
//                 name="endTime"
//                 pattern="([01]?[0-9]{1}|2[0-3]{1}):[0-5]{1}[0-9]{1}"
//                 value={this.state.formValues.endTime}
//                 onChange={this.handleChange.bind(this)}
//               />
//             </label>

//             <label>
//               Comments
//               <input
//                 type="text"
//                 name="comments"
//                 value={this.state.formValues.comments}
//                 onChange={this.handleChange.bind(this)}
//               />
//             </label>

//             <input type="submit" value="Submit" />
//           </form>
//         </div>
//       );
//     }
//   }
// }

// export default withRouter(EditGigPage);
