// import * as firebase from "firebase";
// import "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD76kWWf_Sz4TkpItuwm36ug6x1R-GMj9Y",
  authDomain: "rn-naumenko.firebaseapp.com",
  projectId: "rn-naumenko",
  storageBucket: "rn-naumenko.appspot.com",
  messagingSenderId: "1003903093375",
  appId: "1:1003903093375:web:8f5273abdda29f0561cd4a",
  measurementId: "G-REEDS9X7VV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
// const analytics = getAnalytics(app);
// const auth = getAuth(app);
