// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import "firebase/storage";
// import "firebase/firestore";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyD76kWWf_Sz4TkpItuwm36ug6x1R-GMj9Y",
//   authDomain: "rn-naumenko.firebaseapp.com",
//   projectId: "rn-naumenko",
//   storageBucket: "rn-naumenko.appspot.com",
//   messagingSenderId: "1003903093375",
//   appId: "1:1003903093375:web:8f5273abdda29f0561cd4a",
//   measurementId: "G-REEDS9X7VV",
// };

// test
const firebaseConfig = {
  apiKey: "AIzaSyA9plDaUZ5AC48LyADV68l18VwnECr4oqQ",
  authDomain: "test-8faee.firebaseapp.com",
  projectId: "test-8faee",
  storageBucket: "test-8faee.appspot.com",
  messagingSenderId: "613340104049",
  appId: "1:613340104049:web:6ef10cb3ce8af45bdc62d0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// /

// export default app;
const auth = getAuth();
// const analytics = getAnalytics(app);
// const auth = getAuth(app);

const storage = getStorage(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
