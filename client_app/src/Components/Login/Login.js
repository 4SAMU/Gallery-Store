/** @format */

import React, { useState } from "react";
import BabyThor from "../../assets/thor.png";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function loginUser(event) {
    event.preventDefault();

    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
    console.log("here", data);

    if (data.status === "ok") {
      localStorage.setItem("token", data.user);
      alert("Login successful");
      window.location.href = "/Home";
    } else if (data === "error") {
      alert("account doent exist");
    } else {
      alert("password provided does not match to email address");
    }
  }

  return (
    <div className="Page">
      <img className="bg_login" src={BabyThor} alt="" />
      <div className="login_container">
        <div className="login_header">SIGN IN</div>
        <input
          className="login_input"
          type={"email"}
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="login_input"
          type={"password"}
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="signinbtn" onClick={loginUser}>
          SIGN IN
        </button>

        <p className="donthaveAcc">don’t have an account?</p>
        <Link to={"/Signup"}>
          <p className="donthaveAcc_p">Sign up</p>
        </Link>
      </div>
    </div>
  );
};

export default Login;
