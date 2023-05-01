//data/sdk.ts

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCb4UPMsG5PVLNhlTh1FghRLC6-OTBFOF8",
  authDomain: "course-plataform.firebaseapp.com",
  projectId: "course-plataform",
  storageBucket: "course-plataform.appspot.com",
  messagingSenderId: "692254745951",
  appId: "1:692254745951:web:18c6776a159b827ecf42ea",
  measurementId: "G-HM0QDF66HS"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
const auth = getAuth(appFirebase);
//const analyticsBirebase = getAnalytics(appFirebase);


export {
  appFirebase,
  auth,
  //analyticsBirebase
};