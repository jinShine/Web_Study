import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAz9DX69ECcisIx_6S9zKJJbJQPt5t-Rsc",
  authDomain: "web-test-eb64d.firebaseapp.com",
  projectId: "web-test-eb64d",
  storageBucket: "web-test-eb64d.appspot.com",
  messagingSenderId: "881566615946",
  appId: "1:881566615946:web:7b9255127f8c44a9026073",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
