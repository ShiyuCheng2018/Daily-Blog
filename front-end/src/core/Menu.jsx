import React from 'react';
import {Link, withRouter} from "react-router-dom";
import {signOut, isAuthenticated} from "../auth";

const isActive = (history, path) => {
  if(history.location.pathname === path) return {color: "#ff9900"};
  else return {color: "#000000"}

};

const Menu = ({history}) => (
  <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mx-auto my-3">
                  <li className="nav-item mx-4">
                      <Link to={"/"} className={"nav-link"} style={isActive(history, "/")}>Home</Link>
                  </li>
                  <li className="nav-item">
                      <Link to={"/users"} className={"nav-link mx-4"} style={isActive(history, "/users")}>Users</Link>
                  </li>
                  {! isAuthenticated() && (
                      <>
                          <li className="nav-item">
                              <Link to={"/signin"} className={"nav-link mx-4"} style={isActive(history, "/signin")}>Sign In</Link>
                          </li>
                          <li className="nav-item">
                              <Link to={"/signup"} className={"nav-link mx-4"} style={isActive(history, "/signup")}>Sign Up</Link>
                          </li>
                      </>
                  )}

                  {isAuthenticated() && (
                      <>
                          <li className="nav-item">
                      <span className={"nav-link cursor mx-4"} onClick={()=>signOut(()=>history.push('/'))}
                            style={(isActive(history, "/signout"), {cursor: "pointer", color: "#000000"})}>Sign Out</span>
                          </li>
                          <li className="nav-item">
                              <Link to={`/findpeople`}
                                    style={(isActive(history, `/findpeople`))}
                                    className={"decoration-none nav-link"}>
                                  Find People
                              </Link>
                          </li>
                          <li className={"nav-item"}>
                              <Link to={`/user/${isAuthenticated().user._id}`}
                                    style={(isActive(history, `/user/${isAuthenticated().user._id}`))}
                                    className={"decoration-none nav-link mx-4"}>
                                  {`${isAuthenticated().user.name}'s profile`}
                              </Link>
                          </li>
                      </>
                  )}
              </ul>
              <form className="form-inline my-2 my-lg-0">
                  <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
              </form>
          </div>
      </nav>

  </div>
);

export default withRouter(Menu);

