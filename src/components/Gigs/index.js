import React, { Component } from "react";
import "./Gigs.css";
import Fab from "./../Fab";
import Gig from "./../Gig";
import { addGig, onceGetGigs, getGigsRef, deleteGig } from "../../firebase/db";
import Popup from "react-popup";
import { Link, withRouter } from "react-router-dom";
import * as routes from "./../../constants/routes";

class Gigs extends Component {
  state = {
    gigs: [],
    loading: false
  };
  onAddGigHandler = () => {
    this.props.history.push(routes.GIG);
  };

  handleEditClick = id => {
    this.props.history.push({
      pathname: routes.GIG,
      search: `?id=${id}`
    });
  };

  deleteGigHandler = id => {
    Popup.create({
      title: null,
      content:
        "Do you really want to delete this gig? This change cannot be reverted",
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
              deleteGig(id);
              Popup.close();
            }
          }
        ]
      }
    });
  };

  componentDidMount = () => {
    this.setState({ loading: true });
    getGigsRef().on("value", data => {
      this.setState({ loading: true });
      let allGigs = data.val();
      let gigArr = [];
      Object.keys(allGigs).forEach(gig => {
        gigArr.push({
          id: gig,
          bandname: allGigs[gig].bandName,
          time: allGigs[gig].time,
          date: allGigs[gig].date,
          location: allGigs[gig].location,
          comments: allGigs[gig].comments
        });
      });
      this.setState({ gigs: gigArr, loading: false });
    });
  };

  render() {
    let gigs = this.state.gigs.map(gig => {
      return (
        <Gig
          key={gig.id}
          location={gig.location}
          time={gig.time}
          date={gig.date}
          comments={gig.comments}
          editClickHandler={this.handleEditClick.bind(this, gig.id)}
          clickHandler={this.deleteGigHandler.bind(this, gig.id)}
        />
      );
    });
    if (this.state.loading) {
      return <h1>LOADING</h1>;
    } else {
      return (
        <div className="gigsContainer">
          <Fab clickHandler={this.onAddGigHandler}>
            <i className="material-icons">note_add</i>
          </Fab>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Location</th>
                <th>Comments</th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>{gigs}</tbody>
          </table>
          <Popup />
        </div>
      );
    }
  }
}

export default withRouter(Gigs);
