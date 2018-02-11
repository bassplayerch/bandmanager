import * as firebase from 'firebase';

const prodConfig = {
  apiKey: "AIzaSyBU46mzDc0myDz7j59f14eZvL1mpQSBuu4",
  authDomain: "bandmanager-fluffy.firebaseapp.com",
  databaseURL: "https://bandmanager-fluffy.firebaseio.com",
  projectId: "bandmanager-fluffy",
  storageBucket: "bandmanager-fluffy.appspot.com",
  messagingSenderId: "1097009844802"
};

const devConfig = {
  apiKey: "AIzaSyBU46mzDc0myDz7j59f14eZvL1mpQSBuu4",
  authDomain: "bandmanager-fluffy.firebaseapp.com",
  databaseURL: "https://bandmanager-fluffy.firebaseio.com",
  projectId: "bandmanager-fluffy",
  storageBucket: "bandmanager-fluffy.appspot.com",
  messagingSenderId: "1097009844802"
};

const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export {
  db,
  auth,
};
