
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase confprocess.env.
const firebaseConfig = {
  apiKey: "AIzaSyButyiz1fx-sqarh81JeTBpiMF8tYwwsuk",
  authDomain: "parla-faae7.firebaseapp.com",
  projectId: "parla-faae7",
  storageBucket: "parla-faae7.appspot.com",
  messagingSenderId: "450020603459",
  appId: "1:450020603459:web:628ac047c3e3712e7486f6",
  databaseUrl:"http://react-firebase-parla.firebaseio.com",

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage};