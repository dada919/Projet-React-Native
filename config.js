// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWsXR2_EXtP66UND2Ijzcf4C7GfWH1RXk",
  authDomain: "fir-h3-2a902.firebaseapp.com",
  databaseURL: "https://fir-h3-2a902-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fir-h3-2a902",
  storageBucket: "fir-h3-2a902.appspot.com",
  messagingSenderId: "839036813498",
  appId: "1:839036813498:web:90a14127bda933ae780283"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;