import React from "react";
import Header from "../header/header";
import "./home.css";
import { Link } from "react-router-dom";
import reactLogo from "./Image.png"
const Home = () => {
  return (
    <>
      {/* <Header/> */}

      <div className="body">
        <span className="title">
         <img src={reactLogo} alt="React Logo" className="logo" style={{ width: '175px', height: '175px' }} /><br/>
         Welcome to <br />
          Software Component Repository System
        </span>
        <p className="desc">
        The Software Component Cataloging Software addresses the challenge of efficiently managing and retrieving reusable software components. Built with features such as user authentication, hierarchical categorization, and real-time database updates using ReactJS and Firebase, it streamlines the cataloging process, enabling users to store, search, and reuse components with ease in diverse software development environments.
        </p>
        <Link to="/login" className="btn">Click Here to Login</Link>
        <Link to="/register" className="link">
          New user? Register here
      </Link>
      </div>
    </>
  );
};

export default Home;
