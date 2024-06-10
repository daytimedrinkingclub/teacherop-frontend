import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDwtrh3e0Q2wa11yZLiscZRP6j6P_y2Llw",
  authDomain: "teacherop-420.firebaseapp.com",
  projectId: "teacherop-420",
  storageBucket: "teacherop-420.appspot.com",
  messagingSenderId: "300743871781",
  appId: "1:300743871781:web:168123e85fceb855839ecc",
  measurementId: "G-68NW6E7VVB"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };