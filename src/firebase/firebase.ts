import firebase from "firebase";

export const firebaseConfig = {
  apiKey: "AIzaSyCMCg31eaDb5tVGpeCC4cHPSAF3eSV806w",
  authDomain: "gopizza-e4fda.firebaseapp.com",
  projectId: "gopizza-e4fda",
  storageBucket: "gopizza-e4fda.appspot.com",
  messagingSenderId: "812751350538",
  appId: "1:812751350538:web:1eca7d0488d85708f528f3",
  measurementId: "G-M47RSTX38H"
};

let app;

if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()
const store = firebase.firestore()

export { auth, store };

