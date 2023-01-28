/** @format */

import React from "react";
import "./Home.css";
import Thor from "../../assets/thorbaby.jpeg";
import likeBtn from "../../assets/likeBtn.svg";
import downloadBtn from "../../assets/downloadBtn.svg";
import samu from "../../assets/samu.jpeg";
import Navbar from "../Navabar/Navbar";

const Home = () => {
  return (
    <div className="Page">
      <div className="Home_header_container">
        <p className="Home_header">Hello, Samuel</p>
        <div className="userImage">
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
          <img src={likeBtn} alt="" className="likeBtn" />
          <img src={downloadBtn} alt="" className="downloadBtn" />
          <p className="caption">Baby thor</p>
        </div>

        <div className="pic_card">
          <img src={Thor} alt="" className="myPic" />
          <img src={likeBtn} alt="" className="likeBtn" />
          <img src={downloadBtn} alt="" className="downloadBtn" />
          <p className="caption">Baby thor</p>
        </div>

        <div className="pic_card">
          <img src={Thor} alt="" className="myPic" />
          <img src={likeBtn} alt="" className="likeBtn" />
          <img src={downloadBtn} alt="" className="downloadBtn" />
          <p className="caption">Baby thor</p>
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default Home;
