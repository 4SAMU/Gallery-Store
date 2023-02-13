/** @format */

import React from "react";
import "./Navbar.css";
import { GoHome } from "@react-icons/all-files/go/GoHome";
import { FiUser } from "@react-icons/all-files/fi/FiUser";
import { AiFillCamera } from "@react-icons/all-files/ai/AiFillCamera";
import { AiOutlineMessage } from "@react-icons/all-files/ai/AiOutlineMessage";
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
      <NavLink activeclassname="active" to={"/Messaging"}>
        <AiOutlineMessage
          onClick={() => {
            let room = 1;
            localStorage.setItem("room", room);
          }}
        />
      </NavLink>
    </nav>
  );
};

export default Navbar;
