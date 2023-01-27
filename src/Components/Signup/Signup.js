/** @format */

import React from "react";
import { Link } from "react-router-dom";
import BabyThor from "../../assets/thor.png";
import Google from "../../assets/google.png";
import "./Signup.css";

const Signup = () => {
  return (
    <div className="Page">
      <img className="bg_login" src={BabyThor} alt="" />
      <div className="signup_container">
        <div className="signup_header">signup</div>
        <input className="signup_input" type={"text"} placeholder="name" />
        <input className="signup_input" type={"email"} placeholder="email" />
        <input
          className="signup_input"
          type={"password"}
          placeholder="password"
        />
        <button className="signupbtn">SIGN UP</button>
        <button className="signupbtn">
          sign up with
          <img src={Google} alt="" className="googleIcon" />
        </button>
        <p className="alreadyhaveAcc">already have an account?</p>
        <Link to={"/Login"}>
          <p className="alreadyhaveAcc_p">Sign in</p>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
