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
