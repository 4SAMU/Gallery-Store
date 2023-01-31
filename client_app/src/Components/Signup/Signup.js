/** @format */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import BabyThor from "../../assets/thor.png";
import Google from "../../assets/google.png";
import "./Signup.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function registerUser(event) {
    event.preventDefault();

    const response = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await response.json();
    console.log(data);

    if (data.status === "ok") {
      window.location.replace("/Login");
      console.log(data);

      // alert("status ok");
    } else if (data.status === "error") {
      alert(data.error);
    }
  }
  return (
    <div className="Page">
      <img className="bg_login" src={BabyThor} alt="" />
      <div className="signup_container">
        <div className="signup_header">SIGN UP</div>
        <input
          className="signup_input"
          type={"text"}
          placeholder="name"
          id={name}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="signup_input"
          type={"email"}
          placeholder="email"
          id={email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="signup_input"
          type={"password"}
          placeholder="password"
          id={password}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="signupbtn" onClick={registerUser}>
          SIGN UP
        </button>
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
