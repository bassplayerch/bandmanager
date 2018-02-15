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

export const getGig = (id) => db.ref('gigs/' + id);

export const updateGig = (id, data) => db.ref('gigs/' + id).update(data);

export const updateLocation = (id, data) => {
  console.log('id', id)
  return db.ref('locations/' + id).update(data)};

export const getLocationsRef = () => db.ref("locations");

export const getLocation = (id) => db.ref("locations/" + id);

export const addLocation = gig => db.ref("locations").push(gig);

export const deleteLocation = id => db.ref("/locations/" + id).remove();

export const onceGetUsers = () => db.ref("users").once("value");

export const onceGetGigs = () => db.ref("gigs").once("value");
