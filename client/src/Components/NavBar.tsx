import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <div className="nav-container">
            <Link to="/logout">Logout</Link>
            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/admin">Admin</Link>
        </div>
    );
}