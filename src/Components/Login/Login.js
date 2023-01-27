/** @format */

import React from "react";
import BabyThor from "../../assets/thor.png";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="LogingPage">
      <img className="bg_login" src={BabyThor} alt="" />
      <div className="login_container">
        <div className="login_header">LOGIN</div>
        <input className="login_input" type={"text"} placeholder="name" />
        <input className="login_input" type={"email"} placeholder="email" />
        <input
          className="login_input"
          type={"password"}
          placeholder="password"
        />
        <button className="signupbtn">SIGN IN</button>
        <p className="donthaveAcc">don’t have an account?</p>
        <Link to={"/Signup"}>
          <p className="donthaveAcc_p">Signup</p>
        </Link>
      </div>
    </div>
  );
};

export default Login;
