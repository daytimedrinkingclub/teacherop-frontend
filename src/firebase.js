import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBPjjsB-4kDSYIZFL0GQirJdwo7LZKIpFs",
  authDomain: "teacherop-2717c.firebaseapp.com",
  projectId: "teacherop-2717c",
  storageBucket: "teacherop-2717c.appspot.com",
  messagingSenderId: "1078934686379",
  appId: "1:1078934686379:web:0378fd2ba31af823ce45ee",
  measurementId: "G-FM17NCKL3F"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };