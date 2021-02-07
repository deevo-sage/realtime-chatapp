import firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyCDijkd0bYhzGCiHKINT6-DLvy-SGwFEZg",
  authDomain: "chatroom-eba87.firebaseapp.com",
  projectId: "chatroom-eba87",
  storageBucket: "chatroom-eba87.appspot.com",
  messagingSenderId: "1013655659934",
  appId: "1:1013655659934:web:8b2d8fc1a45c525c84a28f",
  measurementId: "G-27PCZS5VR7",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
export default firebase;
export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const googleauthprovider= new firebase.auth.GoogleAuthProvider();
export const analytics = firebase.analytics();
export const storage = firebase.storage();

