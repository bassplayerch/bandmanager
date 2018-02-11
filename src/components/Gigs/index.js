import React, { Component } from "react";
import "./Gigs.css";
import Button from "./../Button";
import Gig from "./../Gig";
import { addGig, onceGetGigs, getGigsRef, deleteGig } from "../../firebase/db";

class Gigs extends Component {
  state = {
    gigs: [],
    loading: false
  };
  onAddGigHandler = () => {
    addGig({
      bandName: "mynah",
      location: "turgi",
      time: "08:00 - 12:00",
      date: "01.02.2017",
      comments: "no comment"
    });
  };

  deleteGigHandler = (id) => {
    deleteGig(id);
  }

  componentDidMount = () => {
    this.setState({ loading: true });
    getGigsRef().on('value', (data) => {
        this.setState({loading: true});
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
      })
    }

  render() {
    let gigs = this.state.gigs.map(gig => {
      return (
        <Gig
          key={gig.id}
          location={gig.location}
          time={gig.time}
          date={gig.date}
          comments={gig.comments}
          clickHandler={this.deleteGigHandler.bind(this, gig.id)}
        />
      );
    });
    if (this.state.loading) {
      return <h1>LOADING</h1>;
    } else {
      return (
        <div className="gigsContainer">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Location</th>
                <th>Comments</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{gigs}</tbody>
          </table>
          <Button clickHandler={this.onAddGigHandler}>Add Gig</Button>
        </div>
      );
    }
  }
}

export default Gigs;
