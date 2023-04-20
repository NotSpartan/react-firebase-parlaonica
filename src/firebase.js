
// This code imports the necessary functions from Firebase SDKs for authentication, database, and storage.
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, query, where, onSnapshot } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// The Firebase configuration object containing the API key, authentication domain, 
//project ID, storage bucket, messaging sender ID, and app ID.
const firebaseConfig = {
  apiKey: "AIzaSyButyiz1fx-sqarh81JeTBpiMF8tYwwsuk",
  authDomain: "parla-faae7.firebaseapp.com",
  projectId: "parla-faae7",
  storageBucket: "parla-faae7.appspot.com",
  messagingSenderId: "450020603459",
  appId: "1:450020603459:web:628ac047c3e3712e7486f6",
  databaseUrl:"http://react-firebase-parla.firebaseio.com",
};

// Initializes the Firebase app with the configuration object.
const app = initializeApp(firebaseConfig);
// Initializes the Firebase authentication, database, and storage services using the app.
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
// Exports the authentication, database, and storage services for use in other parts of the application.
export { auth, db, storage};