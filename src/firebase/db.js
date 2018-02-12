import { db } from "./firebase";

// User API

export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email
  });

export const addGig = gig => db.ref("gigs").push(gig);

export const deleteGig = id => db.ref("/gigs/" + id).remove();

export const getGigsRef = () => db.ref("gigs");

export const getLocationsRef = () => db.ref("locations");

export const addLocation = gig => db.ref("locations").push(gig);

export const deleteLocation = id => db.ref("/locations/" + id).remove();

export const onceGetUsers = () => db.ref("users").once("value");

export const onceGetGigs = () => db.ref("gigs").once("value");
