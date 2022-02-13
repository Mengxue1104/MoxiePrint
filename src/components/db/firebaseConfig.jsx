// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6YvZAGf5DYMkTkUvyQy99zMAfQ9d3NFQ",
  authDomain: "moxieprint-2008.firebaseapp.com",
  databaseURL: "https://moxieprint-2008-default-rtdb.firebaseio.com",
  projectId: "moxieprint-2008",
  storageBucket: "moxieprint-2008.appspot.com",
  messagingSenderId: "809152565258",
  appId: "1:809152565258:web:bbcb0f121ad952313a4ff3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app)

export {db}