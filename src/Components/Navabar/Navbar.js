/** @format */

import React from "react";
import "./Navbar.css";
import { GoHome } from "@react-icons/all-files/go/GoHome";
import { FiUser } from "@react-icons/all-files/fi/FiUser";
import { AiFillCamera } from "@react-icons/all-files/ai/AiFillCamera";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="Navbar">
      <NavLink to={"/Home"}>
        <GoHome className="homeBtn" />
      </NavLink>
      <NavLink to={"/Profile"}>
        <FiUser className="profileBtn" />
      </NavLink>
      <NavLink to={"/UploadPic"}>
        <AiFillCamera className="pictureBtn" />
      </NavLink>
    </div>
  );
};

export default Navbar;
