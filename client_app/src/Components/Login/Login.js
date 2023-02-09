/** @format */

import React, { useState } from "react";
import BabyThor from "../../assets/thor.png";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import TransclucentBg from "../LoaderTransclucentBg/TransclucentBg";
import { AiOutlineEye } from "@react-icons/all-files/ai/AiOutlineEye";
import { AiOutlineEyeInvisible } from "@react-icons/all-files/ai/AiOutlineEyeInvisible";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function loginUser(event) {
    if (!email && !password) {
      setIsModalOpen(false);
      setBusy(false);
      toast.warn("all fields must be filled");
    } else {
      try {
        setBusy(true);
        setIsModalOpen(true);
        event.preventDefault();

        const response = await fetch(
          "https://gallery-store-api.vercel.app/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password,
            }),
          }
        );

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
          setIsModalOpen(false);
          setBusy(false);
          toast.error("account doent exist");
        } else {
          setIsModalOpen(false);
          setBusy(false);
          toast.warn("password provided does not match to email address");
        }
      } catch (error) {
        setIsModalOpen(false);
        setBusy(false);
        toast.warn(error);
      }
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
              {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </span>
          </div>
        </div>

        <button className="signinbtn" onClick={loginUser}>
          {busy ? "loading..." : " SIGN IN"}
        </button>

        <p className="donthaveAcc">don’t have an account?</p>
        <Link to={"/Signup"}>
          <p className="donthaveAcc_p">Sign up</p>
        </Link>
      </div>
      <TransclucentBg isOpen={isModalOpen} />
    </div>
  );
};

export default Login;
