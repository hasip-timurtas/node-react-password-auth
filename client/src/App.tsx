import React from "react";
import NavBar from "./Components/NavBar";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from "./Pages/HomePage";
import AdminPage from "./Pages/AdminPage";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import "./styles/main.scss"

export default function App() {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route path='/' exact component={HomePage}></Route>
                <Route path='/admin' component={AdminPage}></Route>
                <Route path='/login' component={Login}></Route>
                <Route path='/profile' component={Profile}></Route>
            </Switch>
        </Router>
    );
}
