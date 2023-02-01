/** @format */

import React, { useState } from "react";
import "./Home.css";
import Thor from "../../assets/thorbaby.jpeg";
import samu from "../../assets/samu.jpeg";
import Navbar from "../Navabar/Navbar";

import { FiHeart } from "@react-icons/all-files/fi/FiHeart";
import { BsDownload } from "@react-icons/all-files/bs/BsDownload";
import Modal from "../ModalPopup/Modal";
import jwt from "jwt-decode";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem("token");

  const userd = jwt.decode(token);

  console.log(userd);

  return (
    <div className="Page">
      <div className="Home_header_container">
        <p className="Home_header">Hello, {userd.name}</p>
        <div
          className="userImage"
          onMouseEnter={() => setIsModalOpen(true)}
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          <img src={samu} alt="" className="userImage" />
        </div>
      </div>
      <div className="Story_status">
        <div className="Story_status_pics">
          <img src={Thor} alt="" className="status_pics" />
        </div>
        <div className="Story_status_pics">
          <img src={Thor} alt="" className="status_pics" />
        </div>
        <div className="Story_status_pics">
          <img src={Thor} alt="" className="status_pics" />
        </div>
        <div className="Story_status_pics">
          <img src={Thor} alt="" className="status_pics" />
        </div>
      </div>

      <div className="many_pics_container">
        <div className="pic_card">
          <img src={Thor} alt="" className="myPic" />
          <FiHeart className="likeBtn" />
          <a href={Thor} download={Thor}>
            <BsDownload className="downloadBtn" />
          </a>
          <p className="caption">Baby thor</p>
        </div>
      </div>
      <Navbar />
      <Modal isOpen={isModalOpen} />
    </div>
  );
};

export default Home;
