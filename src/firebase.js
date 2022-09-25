// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'




// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABDAloGWfyWeKWdHCNku3q3Hc_yIefJ7k",
  authDomain: "superchat-1b52d.firebaseapp.com",
  projectId: "superchat-1b52d",
  storageBucket: "superchat-1b52d.appspot.com",
  messagingSenderId: "1097982228181",
  appId: "1:1097982228181:web:96e5033dd119a3af27145c"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
//Intialize Authentication
export const auth = getAuth(app);
//Initialize Firestore Database
export const db = getFirestore(app);