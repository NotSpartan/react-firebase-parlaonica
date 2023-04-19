/**
This code exports a PrivateRoute component that is used to protect routes that require authentication.
It imports the AuthContext and Navigate and Outlet components from the react-router-dom library.
The PrivateRoute component takes in a component and other props and returns an Outlet component.
The Outlet component renders the component passed in as a prop if the user is authenticated, otherwise it redirects to the login page.
The user’s authentication status is obtained from the AuthContext using the useContext hook.
*/

import React, {useContext} from 'react';
import {AuthContext} from "../context/auth"; // Importing the AuthContext from the “…/context/auth” file
import { Navigate, Outlet } from "react-router-dom"; // Importing the Navigate and Outlet components from the react-router-dom library

const PrivateRoute= ({component: Component, ...rest}) => {// Defining the PrivateRoute component and destructuring the component 
                                                         //prop and other props using the spread operator
    const {user} = useContext(AuthContext); // Using the useContext hook to get the user object from the AuthContext

    return  (
    <Outlet 
    {...rest} // Passing the other props to the Outlet component
    exact // Setting the exact prop to true
    render={(props) => 
        user ? <Component {...props} /> : <Navigate replace to="/login" /> // Rendering the component passed in as a prop if 
                                                                        //the user is authenticated, otherwise redirecting to the login page
    }
    />
    );
};

export default PrivateRoute;