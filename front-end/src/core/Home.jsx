import React from "react";
import Posts from "../post/Posts";

const Home = () => (
    <>
        {/*main two*/}
        <section className={"container main-two my-5 w3-container"} style={{height: "400px"}}>
            <div className={"row h-100"}>
               {/*main-two-left*/}
                <div className={"main-two-left mr-auto  w3-animate-left"} style={{width: "48%"}}>
                    <div className={"row h-75"}></div>
                    <div className={"row"}>
                        <div className={"col col-11 ml-4"}>
                            <h4>When Being Beautiful Is The Only Thing Worth Being</h4>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"col col-11 ml-4"}>
                            <div className={"row"}>
                                <div className={"col col-4"}>
                                    <h6 >By Anna Rubinstein</h6>
                                </div>
                                <div className={"col col-4"}>
                                    <h6 className="">June 3, 2019</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
             {/*end of main-two-left*/}
               {/*main-two-right*/}
                <div className={"main-two-right ml-auto w3-animate-right"} style={{width: "48%"}}>
                    <div className={"row h-75"}></div>
                    <div className={"row"}>
                        <div className={"col col-11 ml-4"}>
                            <h4>Advantages of Female Education: A Look to The Future</h4>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"col col-11 ml-4"}>
                            <div className={"row"}>
                                <div className={"col col-4"}>
                                    <h6>By Anna Rubinstein</h6>
                                </div>
                                <div className={"col col-4"}>
                                    <h6>June 3, 2019</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                     {/*end of main-two-right*/}
            </div>
        </section>
        {/*end of main two*/}

        {/*main text*/}
        <section class={"container my-5 w3-animate-fading"}>
            <div class={"row"}>
                <div class={"col col-4 mx-auto"}>
                    <h1>Hi, I'm Rosenstein</h1>
                </div>
            </div>
            <div class={"row"}>
                <div class={"col col-5 mx-auto"}>
                    <h6 class={"font-weight-lighter text-muted"}>A beauty and fashion blogger, love dogs and coffee</h6>
                </div>
            </div>
        </section>
        {/*end of main text*/}




        <div className={"container"}>
            <Posts/>
        </div>
    </>

);

export default Home;