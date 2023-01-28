/** @format */

import React from "react";
import "./Modal.css";

const Modal = ({ isOpen }) => {
  return (
    <div className={`ModalContainer ${isOpen ? "open" : "close"}`}>
      <p className="ModalContainer_header">Update your profile</p>
      <button className="proceedBtn">Update Profile</button>
    </div>
  );
};

export default Modal;
