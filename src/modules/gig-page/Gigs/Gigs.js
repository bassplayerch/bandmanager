import React, { Component } from "react";
import Fab from "./../../../components/Fab/Fab";
import Gig from "./../Gig/Gig";
import ContentContainer from "./../../../layout/ContentContainer/ContentContainer";
import GigsTable from './GigsTable';
import {
  getGigsRef,
  deleteGig,
  getLocation
} from "../../../firebase/db";
import Popup from "react-popup";
import { withRouter } from "react-router-dom";
import * as routes from "./../../../constants/routes";

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
        getLocation(allGigs[gig].location)
          .once("value")
          .then(d => {
            let loc = d.val() ? d.val().name : "location deleted";
            gigArr.push({
              id: gig,
              bandname: allGigs[gig].bandName,
              time: allGigs[gig].startTime + " - " + allGigs[gig].endTime || "",
              date: allGigs[gig].date,
              location: loc,
              comments: allGigs[gig].comments
            });
            this.setState({ gigs: gigArr, loading: false });
          });
      });
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
          deleteClickHandler={this.deleteGigHandler.bind(this, gig.id)}
        />
      );
    });
    if (this.state.loading) {
      return <h1>LOADING</h1>;
    } else {
      return (
        <ContentContainer>
          <GigsTable>
            <tbody>{gigs}</tbody>
          </GigsTable>
          <Fab clickHandler={this.onAddGigHandler}>
            <i className="material-icons">note_add</i>
          </Fab>
          <Popup />
        </ContentContainer>
      );
    }
  }
}

export default withRouter(Gigs);
