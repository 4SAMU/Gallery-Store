/** @format */

import React, { useState } from "react";
import BabyThor from "../../assets/thor.png";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function loginUser(event) {
    event.preventDefault();

    const response = await fetch("https://gallery-store-api.vercel.app/login", {
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
      toast.success("Login successful");
      setTimeout(function () {
        // code to be executed after 3 seconds
        window.location.href = "/Home";
      }, 3000);
    } else if (data === "error") {
      toast.error("account doent exist");
    } else {
      toast.warn("password provided does not match to email address");
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
