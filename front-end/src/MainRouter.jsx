import React from "react";
import {Route, Switch} from "react-router-dom";
import Home from "./core/Home";
import Menu from './core/Menu';
import SignUp from "./user/SignUp";
import SignIn from "./user/SignIn";
import Profile from "./user/Profile";
import Users from "./user/Users";
import EditProfile from "./user/EditProfile";
import PrivateRoute from "./auth/PrivateRoute";


const MainRouter = () => (
    <div>
        <Menu/>
        <Switch>
            <Route exact path={'/'} component={Home}/>
            <Route exact path={"/users"} component={Users}/>
            <Route exact path={"/signup"} component={SignUp}/>
            <Route exact path={"/signin"} component={SignIn}/>
            <PrivateRoute exact path={"/user/:userId"} component={Profile}/>
            <PrivateRoute exact path={"/user/edit/:userId"} component={EditProfile}/>
        </Switch>
    </div>
);



export default MainRouter;