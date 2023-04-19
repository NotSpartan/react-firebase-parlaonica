
/*
This code defines a functional component called Register that renders a form to create a new user account. 
The form takes in user’s name, email, and password as input and on submission, creates a new user account using Firebase 
authentication and stores the user’s information in Firestore database.

The component uses useState hook to manage the form data and loading state. 
It also uses useNavigate hook from react-router-dom to navigate to the home page after successful registration.

The createUserWithEmailAndPassword function from Firebase auth is used to create a new user account. 
The setDoc function from Firestore is used to store the user’s information in the “users” collection in Firestore. 
The Timestamp function is used to set the createdAt field in the document.

The handleChange function is called on input change to update the form data in the state. 
The handleSubmit function is called on form submission to create a new user account and store the user’s information in Firestore.
*/

import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import {setDoc, doc, Timestamp} from "firebase/firestore";
import {useNavigate} from "react-router-dom";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    error: null,
    loading: false,
  });

  const navigate = useNavigate();

  const { name, email, password, error, loading } = data;

// Function to update the form data in the state
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
// Function to create a new user account and store the user’s information in Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();
    setData({ ...data, error: null, loading: true });

    /* The if statement checks if any of the required fields (name, email, password) are empty. 
    If any of them are empty, it sets an error message in the state.
    The try block contains the logic to create a new user account using the createUserWithEmailAndPassword function from Firebase auth. 
    It then uses the setDoc function from Firestore to store the user’s information in the “users” collection in Firestore. 
    The createdAt field is set using the Timestamp function from Firestore. 
    Finally, the state is updated to clear the form data and navigate to the home page.
    The form is rendered using JSX. The input fields are controlled components, meaning their values are controlled by the state. 
    The handleSubmit function is called on form submission. 
    If there is an error, it is displayed using a conditional rendering of a p tag with the error message. 
    */
    if (!name || !email || !password) {
      setData({ ...data, error: "All fields are required" });
    }
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(db, "users", result.user.uid), {
        uid: result.user.uid,
        name,
        email,
        createdAt: Timestamp.fromDate(new Date()),
        isOnline:true,
      });
      setData({
        name: "", 
        email: "", 
        password: "", 
        error: null, 
        loading: false,
      });
      navigate("/", { replace: true });

    } catch (err) {
      setData({ ...data, error: err.message, loading: false });
    }
  };
  return (
    <section>
      <h3>Create An Account</h3>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input_container">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={name} onChange={handleChange} />
        </div>
        <div className="input_container">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="input_container">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        {error ? <p className="error">{error}</p> : null}
        <div className="btn_container">
          <button className="btn" disabled={loading}> 
          {loading ? 'Creating...' : "Register"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Register;
