/** @format */

import React from "react";
import { Link } from "react-router-dom";
import BabyThor from "../../assets/thor.png";
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
        <p className="alreadyhaveAcc">don’t have an account?</p>
        <Link to={"/Signup"}>
          <p className="alreadyhaveAcc_p">Signup</p>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
