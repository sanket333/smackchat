import firebase from "firebase/app"

import 'firebase/auth'
import 'firebase/database'

var firebaseConfig = {
  apiKey: "AIzaSyBx-oHlFovVmBLohmqOi0c4pqSV7_JnEQk",
  authDomain: "smackchat-982c3.firebaseapp.com",
  projectId: "smackchat-982c3",
  storageBucket: "smackchat-982c3.appspot.com",
  messagingSenderId: "826360658875",
  appId: "1:826360658875:web:797bf57c1ef30823c2e29e"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAuth = firebaseApp.auth()
const firebaseDb = firebaseApp.database()

export { firebaseAuth, firebaseDb }
