/** @format */

import React from "react";
import BabyThor from "../../assets/thor.png";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="Page">
      <img className="bg_login" src={BabyThor} alt="" />
      <div className="login_container">
        <div className="login_header">SIGN IN</div>
        <input className="login_input" type={"email"} placeholder="email" />
        <input
          className="login_input"
          type={"password"}
          placeholder="password"
        />
        <Link to={"/Home"}>
          <button className="signinbtn">SIGN IN</button>
        </Link>
        <p className="donthaveAcc">don’t have an account?</p>
        <Link to={"/Signup"}>
          <p className="donthaveAcc_p">Sign up</p>
        </Link>
      </div>
    </div>
  );
};

export default Login;
