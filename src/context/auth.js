/*
This code exports an AuthProvider component that creates an authentication context using the createContext function from React. 
The AuthProvider component takes in a children prop and returns a Provider component with the AuthContext and the children as its value.

The AuthProvider component uses the useState hook to create two state variables: user and loading. 
The user state variable is initialized to null and will be updated with the current user object when the user logs in or logs out. 
The loading state variable is initialized to true and will be set to false when the user authentication state has been determined.

The useEffect hook is used to listen for changes in the user authentication state using the onAuthStateChanged function from Firebase. 
When the user authentication state changes, the setUser function is called to update the user state variable with the current 
user object, and the setLoading function is called to set the loading state variable to false.

If the loading state variable is true, the component returns a Loading component to indicate that the authentication state is 
being determined.
The AuthProvider component returns a Provider component with the AuthContext and the children as its value, which allows 
any child component to access the user object from the authentication context.
*/

import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import Loading from "../components/Loading";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);  // user state variable initialized to null
  const [loading, setLoading] = useState(true); // loading state variable initialized to true

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {// listens for changes in user authentication state
      setUser(user); // updates user state variable with current user object
      setLoading(false); // sets loading state variable to false
    });
  }, []);
  if (loading) { //if loading state variable is true, return a Loading component to indicate that 
                 //the authentication state is being determined.
    return <Loading />;
  }
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
/* The AuthProvider component returns a Provider component with the AuthContext and the children as its value, 
which allows any child component to access the user object from the authentication context.
The import statements at the top of the code import the necessary functions and components from the React and Firebase libraries. 
The Loading component is imported from a local file. */
export default AuthProvider;