//rsc kratica za početni skeleton funkcije
/*
This code defines the Navbar component, which is a navigation bar that appears at the top of the page. 
It imports several modules from the React and Firebase libraries, including Link, auth, db, signOut, updateDoc, and doc. 
It also imports the AuthContext and useNavigate hooks from the context and router modules, respectively.
The Navbar component renders a navigation bar with a logo and links to different pages, depending on whether the user is 
logged in or not. If the user is logged in, the navigation bar displays links to the user’s profile page and a logout button. 
If the user is not logged in, the navigation bar displays links to the registration and login pages.
The handleSingout function is an asynchronous function that updates the user’s status to “offline” in the 
Firebase database, signs the user out of the application, and navigates the user to the home page.
*/
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore"; // removed getDoc import
import { AuthContext } from "../context/auth";
import { useNavigate } from 'react-router-dom'; 

// Defining the Navbar component
const Navbar = () => {
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);
    
// Defining the handleSingout function
    const handleSingout = async() =>{
        await updateDoc(doc(db, 'users', auth.currentUser.uid),{
            isOnline: false,
        });
        await signOut(auth);
        navigate("/", { replace: true });
    };
    // Rendering the navigation bar
    return (
        <nav>
            <h3><Link to="/" >Parlaonica</Link></h3>
            <div>
                {user ?(
                <>
                <Link to='/profile'>Profile</Link>
                <button className='btn' onClick={handleSingout}>Logout</button>
                </>
                ):(
                <>
                <Link to='/register'>Register</Link>
                <Link to='/login'>Login</Link>
                </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;