import React, { useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import { myContext } from "../Pages/Context";

export default function NavBar() {
    const user = useContext(myContext);
    console.log(user);
    return (
        <div className="nav-container">
            {user ?
                (
                    <Fragment>
                        <Link to="/logout">Logout</Link>
                        <Link to="/profile">Profile</Link>
                        {user.isAdmin && <Link to="/admin">Admin</Link>}

                    </Fragment>
                ) : (
                    <Fragment>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </Fragment>
                )
            }
            <Link to="/">Home</Link>
        </div >
    );
}