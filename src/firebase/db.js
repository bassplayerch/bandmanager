import { db } from "./firebase";
import * as axios from 'axios';

// User API

export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email
  });

export const addGig = gig => db.ref("gigs").push(gig);

export const deleteGig = id => db.ref("/gigs/" + id).remove();

export const getGigsRef = () => db.ref("gigs");

export const getGig = id => db.ref("gigs/" + id);

export const updateGig = (id, data) => db.ref("gigs/" + id).update(data);

export const updateLocation = (id, data) => {
  return db.ref("locations/" + id).update(data);
};

export const getLocations = () => db.ref("locations");

export const getLocation = id => db.ref("locations/" + id);

export const addLocation = location => db.ref("locations").push(location);

export const deleteLocation = id => db.ref("/locations/" + id).remove();

export const onceGetUsers = () => db.ref("users").once("value");

export const onceGetGigs = () => db.ref("gigs").once("value");

export const uploadSong = (file, id) => {
  let data = new FormData()
  data.append('file', file, `${id}.mp3`);

  axios.post('https://mynah-stories.herokuapp.com/upload', data)
    .then(res => alert('song uploaded'))
    .catch(err => alert('error uploading song'))
}

export const getStories = () => db.ref('stories');