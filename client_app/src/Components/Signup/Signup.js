/** @format */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import BabyThor from "../../assets/thor.png";
import Google from "../../assets/google.png";
import "./Signup.css";
import TransclucentBg from "../LoaderTransclucentBg/TransclucentBg";
import { toast } from "react-toastify";
import { AiOutlineEye } from "@react-icons/all-files/ai/AiOutlineEye";
import { AiOutlineEyeInvisible } from "@react-icons/all-files/ai/AiOutlineEyeInvisible";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function registerUser(event) {
    if (!name && !email && !password) {
      setIsModalOpen(false);
      setBusy(false);
      toast.warn("all fields must be filled");
    } else {
      setIsModalOpen(true);
      setBusy(true);
      event.preventDefault();

      const response = await fetch(
        "https://gallery-store-api.vercel.app/register",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (data.status === "ok") {
        toast.success("account created successfully");
        setTimeout(function () {
          // code to be executed after 3 seconds
          window.location.href = "/Login";
        }, 3000);

        // alert("status ok");
      } else if (data.status === "error") {
        setIsModalOpen(false);
        setBusy(false);
        toast.warn(data.error);
      }
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
        <div className="password_input_container">
          <input
            className="password_input"
            type={showPassword ? "text" : "password"}
            placeholder="password"
            id={password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="show_hide">
            <span
              className="show_hide_icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEye />:<AiOutlineEyeInvisible /> }
            </span>
          </div>
        </div>
        <button className="signupbtn" onClick={registerUser}>
          {busy ? "loading..." : " SIGN UP"}
        </button>
        <button
          className="signupbtn"
          onClick={() => setShowPassword(!showPassword)}
        >
          signup with
          <img src={Google} alt="" className="googleIcon" />
        </button>
        <p className="alreadyhaveAcc">already have an account?</p>
        <Link to={"/Login"}>
          <p className="alreadyhaveAcc_p">Sign in</p>
        </Link>
      </div>
      <TransclucentBg isOpen={isModalOpen} />
    </div>
  );
};

export default Signup;
