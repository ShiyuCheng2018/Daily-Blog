import React from "react";
import {Route, Switch} from "react-router-dom";
import Home from "./core/Home";
import Menu from './core/Menu';
import SignUp from "./user/SignUp";
import SignIn from "./user/SignIn";
import Profile from "./user/Profile";
import Users from "./user/Users";
import EditProfile from "./user/EditProfile";
import FindPeople from "./user/FindPeople";
import NewPost from "./post/NewPost";
import SinglePost from "./post/SinglePost";
import PrivateRoute from "./auth/PrivateRoute";

const MainRouter = () => (
    <div>


        {/*logo*/}
        <section class="container">
            <div class="row">
                <img class="mx-auto my-5" src="https://reefki.sirv.com/stein.rifki.net/2019/06/r/o/n/rosenstein.png" alt="logo" height="70px"/>
            </div>
        </section>
        {/*logo*/}

        <Menu/>
        <Switch>
            <Route exact path={'/'} component={Home}/>
            <Route exact path={'/post/:postId'} component={SinglePost}/>
            <Route exact path={"/users"} component={Users}/>
            <Route exact path={"/signup"} component={SignUp}/>
            <Route exact path={"/signin"} component={SignIn}/>
            <PrivateRoute exact path={"/user/:userId"} component={Profile}/>
            <PrivateRoute exact path={"/user/edit/:userId"} component={EditProfile}/>
            <PrivateRoute exact path={"/findpeople"} component={FindPeople}/>
            <PrivateRoute exact path={"/post/new/create/:userId"} component={NewPost}/>
        </Switch>
    </div>
);



export default MainRouter;