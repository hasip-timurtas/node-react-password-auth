import React, { useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import { myContext } from "../Pages/Context";
import serverApi from "../Apis/ServerApi";
import { AxiosResponse } from "axios";

export default function NavBar() {
    const user = useContext(myContext);
    console.log(user);

    const handleLogout = () => {
        serverApi.get('/logout').then((res: AxiosResponse) => {
            console.log(res.data);
            if (res.data === 'success') {
                // window.location.href = '/';
            }
        });
    }

    return (
        <div className="nav-container">
            {user ?
                (
                    <Fragment>
                        <Link onClick={handleLogout} to="/logout">Logout</Link>
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