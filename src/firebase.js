// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Import getAuth
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwtrh3e0Q2wa11yZLiscZRP6j6P_y2Llw",
  authDomain: "teacherop-420.firebaseapp.com",
  projectId: "teacherop-420",
  storageBucket: "teacherop-420.appspot.com",
  messagingSenderId: "300743871781",
  appId: "1:300743871781:web:168123e85fceb855839ecc",
  measurementId: "G-68NW6E7VVB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);