import firebase from "firebase";
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCdNVjKVGUCd3fiwbEroBTKfcm3KskH9lc",
  authDomain: "instagram-clone-94df0.firebaseapp.com",
  databaseURL: "https://instagram-clone-94df0.firebaseio.com",
  projectId: "instagram-clone-94df0",
  storageBucket: "instagram-clone-94df0.appspot.com",
  messagingSenderId: "713908064848",
  appId: "1:713908064848:web:820c339dbab12fe238f755",
  measurementId: "G-0YKLHM1V1N",
});
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db,auth,storage};
//export default db;
