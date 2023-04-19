/*
This code is the main component of a React application that uses React Router to handle routing. 
It imports the necessary components and pages, including Home, Navbar, Register, Login, Profile, and AuthProvider.

The App component returns a JSX element that wraps the entire application in an AuthProvider context. 
It also uses the Fragment component to group multiple child elements without adding extra nodes to the DOM.

The BrowserRouter component is used to provide the routing functionality, and the Navbar component is rendered at 
the top of the page to provide navigation links. The Routes component is used to define the different routes of the application, 
and the Route component is used to define each individual route.

The exact prop is used to ensure that the path matches exactly, and the element prop is used to specify the 
component that should be rendered when the route is accessed.
*/

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, {Fragment} from 'react';
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from './pages/Profile'
import AuthProvider from "./context/auth";


function App() {
  return (
    <AuthProvider>
      <Fragment>
      <BrowserRouter> 
        <Navbar />  
        <Routes>
          <Route exact path="/register"  element={<Register/>} />
          <Route exact path="/login"  element={<Login/>} />
          <Route exact path="/profile"  element={<Profile/>} />
          <Route exact path="/" element={<Home/>} />
        </Routes>
      </BrowserRouter>
      </Fragment>

    </AuthProvider>
  );
}

export default App;
