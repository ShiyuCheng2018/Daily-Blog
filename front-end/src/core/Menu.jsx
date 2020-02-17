import React from 'react';
import {Link, withRouter} from "react-router-dom";

const isActive = (history, path) => {
  if(history.location.pathname === path) return {color: "#ff9900"};
  else return {color: "#ffffff"}

};

export const signOut = (next) =>{
  if(typeof window !== "undefined") localStorage.removeItem("jwt");
  next();
  return fetch("http://localhost:8080/signout", {
      method: "GET"
  }).then(res=>{return res.json()}).catch(err=>console.log(err))

};

const Menu = ({history}) => (
  <div>
      <ul className="nav nav-tabs bg-primary">
          <li className="nav-item">
              <Link to={"/"} class={"nav-link"} style={isActive(history, "/")}>Home</Link>
          </li>
          <li className="nav-item">
              <Link to={"/signin"} class={"nav-link"} style={isActive(history, "/signin")}>Sign In</Link>
          </li>
          <li className="nav-item">
              <Link to={"/signup"} class={"nav-link"} style={isActive(history, "/signup")}>Sign Up</Link>
          </li>
          <li className="nav-item">
              <a className={"nav-link cursor"} onClick={()=>signOut(()=>history.push('/'))}
                 style={(isActive(history, "/signout"), {cursor: "pointer", color: "#fff"})}>Sign Out</a>
          </li>
      </ul>
  </div>
);

export default withRouter(Menu);

