// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "Process.env.STOREFRONT_FIREBASE_API_KEY",
  authDomain: "Process.env.STOREFRONT_FIREBASE_AUTH_DOMAIN",
  databaseURL: "Process.env.STOREFRONT_FIREBASE_DATABASE_URL",
  projectId: "Process.env.STOREFRONT_FIREBASE_PROJECT_ID",
  storageBucket: "Process.env.STOREFRONT_FIREBASE_STORAGE_BUCKET",
  messagingSenderId: "Process.env.STOREFRONT_FIREBASE_MESSAGING_SENDER_ID",
  appId: "Process.env.Process.env.STOREFRONT_FIREBASE_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app)

export {db}