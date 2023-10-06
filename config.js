// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZXvlowdbMfiN1EyTP5KJoXA38DUnjsgQ",
  authDomain: "h3-projet-react-native.firebaseapp.com",
  projectId: "h3-projet-react-native",
  storageBucket: "h3-projet-react-native.appspot.com",
  messagingSenderId: "272461822440",
  appId: "1:272461822440:web:9d9f84de2973341bc58c5d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;