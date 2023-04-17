//rsc kratica za početni skeleton funkcije
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { updateDoc, doc , getDoc} from "firebase/firestore";
import { AuthContext } from "../context/auth";
import { useNavigate } from 'react-router-dom'; 


const Navbar = () => {
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);
    

    const handleSingout = async() =>{
        await updateDoc(doc(db, 'users', auth.currentUser.uid),{
            isOnline: false,
        });
        await signOut(auth);
        navigate.replace("/login");
    };
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