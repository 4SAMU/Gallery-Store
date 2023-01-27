/** @format */

import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="Page">
      <div className="Home_header_container">
        <p className="Home_header">Hello, Samuel</p>
        <div className="userImage">
          <img src={""} alt="" />
        </div>
      </div>
      <div className="Story_status">
        <div className="Story_status_pics">
          <img src="" alt="" />
        </div>
        <div className="Story_status_pics">
          <img src="" alt="" />
        </div>
        <div className="Story_status_pics">
          <img src="" alt="" />
        </div>
        <div className="Story_status_pics">
          <img src="" alt="" />
        </div>
      </div>

      <div className="many_pics_container">
        <div className="pic_card"></div>
        <div className="pic_card"></div>
        <div className="pic_card"></div>
        <div className="pic_card"></div>
      </div>
    </div>
  );
};

export default Home;
