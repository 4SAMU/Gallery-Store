/** @format */

import React from "react";
import { Link } from "react-router-dom";
import "./Modal.css";

const Modal = ({ isOpen }) => {
  return (
    <div className={`ModalContainer ${isOpen ? "open" : "close"}`}>
      <p className="ModalContainer_header">Update your profile</p>
      <Link to={"/Profile"}>
        <button className="proceedBtn">Update Profile</button>
      </Link>
    </div>
  );
};

export default Modal;
