/** @format */

import React from "react";
import "./Navbar.css";
import { GoHome } from "@react-icons/all-files/go/GoHome";
import { FiUser } from "@react-icons/all-files/fi/FiUser";
import { AiFillCamera } from "@react-icons/all-files/ai/AiFillCamera";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <NavLink activeclassname="active" to={"/Home"}>
        <GoHome />
      </NavLink>
      <NavLink activeclassname="active" to={"/Profile"}>
        <FiUser />
      </NavLink>
      <NavLink activeclassname="active" to={"/UploadPic"}>
        <AiFillCamera />
      </NavLink>
    </nav>
  );
};

export default Navbar;
