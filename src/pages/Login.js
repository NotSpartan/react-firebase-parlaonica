/*
This code defines a Login component that allows users to log into their account. 
It uses Firebase authentication and Firestore to update the user’s status to “online” upon successful login.

The component renders a form with two input fields for email and password, respectively. 
It also displays an error message if the user fails to enter either of these fields.

The handleSubmit function is called when the user submits the form. 
It first sets the loading state to true and clears any previous error messages. 
If the user fails to enter either the email or password field, an error message is displayed. 
If the user enters both fields, the signInWithEmailAndPassword function from Firebase is called to authenticate the user. 
If authentication is successful, the user’s status is updated to “online” in Firestore and the form is reset. 
If authentication fails, an error message is displayed.

The handleChange function is called whenever the user types into either the email or password input fields. 
It updates the state with the new values.
The navigate function is used to redirect the user to the home page upon successful login.
Overall, this code defines a functional component that renders a login form and handles user authentication using Firebase. 
It also updates the user’s status in Firestore upon successful login. 
*/

import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { updateDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    error: null,
    loading: false,
  });

  const navigate = useNavigate();

  const { email, password, error, loading } = data; 
// Updates the state with the new values whenever the user types into either the email or password input fields
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

// Called when the user submits the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setData({ ...data, error: null, loading: true });
    if (!email || !password) {
      setData({ ...data, error: "All fields are required" });
    }
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      await updateDoc(doc(db, "users", result.user.uid), {
        isOnline: true,
      });
      setData({
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
      <h3>Log into your Account</h3>
      <form className="form" onSubmit={handleSubmit}>
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
            {loading ? "Logging in ..." : "Login"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Login;