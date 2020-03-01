import React from "react";
import Posts from "../post/Posts";

const Home = () => (
    <>
        <div className={"jumbotron"}>
            <h2>Home</h2>
        </div>
        <div className={"container"}>
            <Posts/>
        </div>
    </>

);

export default Home;