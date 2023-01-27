/** @format */

import React from "react";
import "./Login.css";
import BabyThor from "../../assets/thorbaby.jpeg";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="LogingPage">
      <div className="login_header">LOGIN</div>
      <img className="bg_login" src={BabyThor} alt="" />
      <input className="login_input" type={"text"} placeholder="name" />
      <input className="login_input" type={"email"} placeholder="email" />
      <input className="login_input" type={"password"} placeholder="password" />
      <button className="signupbtn">SIGN IN</button>
      <p className="donthaveAcc">don’t have an account?</p>
      <Link to={"/Signup"}>
        <p className="donthaveAcc_p">Signup</p>
      </Link>
    </div>
  );
};

export default Login;
