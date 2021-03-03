import React, { useContext, Fragment } from "react";
import NavBar from "./Components/NavBar";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from "./Pages/HomePage";
import AdminPage from "./Pages/AdminPage";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import "./styles/main.scss";
import { myContext } from "./Pages/Context";
import Register from "./Pages/Register";
import NotFound from "./Pages/NotFound";

export default function App() {
    const user = useContext(myContext);
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route path='/' exact component={HomePage}></Route>
                {user ? (
                    <Fragment>
                        {user.isAdmin && <Route path='/admin' component={AdminPage}></Route>}
                        <Route path='/profile' component={Profile}></Route>
                    </Fragment>
                ) : (
                        <Fragment>
                            <Route path='/login' component={Login}></Route>
                            <Route path='/register' component={Register}></Route>
                        </Fragment>
                    )}
                <Route path='*' component={NotFound}></Route>
            </Switch>
        </Router>
    );
}
