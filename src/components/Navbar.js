//rsc kratica za početni skeleton funkcije
import React from 'react';
import {Link} from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <h3><Link to="/" >
                Parlaonica</Link>
            </h3>
            <div>
                <Link to='/register'>Register</Link>
                <Link to='/login'>Login</Link>
            </div>

        </nav>
    );
};

export default Navbar;