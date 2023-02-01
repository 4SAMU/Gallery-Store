/** @format */

import React, { useEffect, useState } from "react";
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
  const [uploadData, setUploadData] = useState([]);
  const token = localStorage.getItem("token");

  const userd = jwt(token);

  console.log(userd);

  async function getFiles() {
    const response = await fetch(
      "https://gallery-store-api.vercel.app/getFiles"
    );
    // console.log(response);

    const data = await response.json();
    const myData = data.files;

    const dataItems = await Promise.all(
      myData.map(async (index) => {
        const caption = index.caption;
        const image = `https://gallery-store-api.vercel.app/${index.image}`;

        const items = {
          caption,
          image,
        };
        return items;
      })
    );
    setUploadData(dataItems.reverse());
    console.log("here", dataItems);
  }

  useEffect(() => {
    getFiles();
    const interval = setInterval(() => {
      getFiles();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="Page">
      <div className="Home_header_container">
        <p className="Home_header">Hello, {userd.name}</p>
        {isModalOpen ? (
          <div
            className="userImage"
            onClick={() => setIsModalOpen(!isModalOpen)}
          >
            {userd.avatar === "samuel.png" ? (
              <img src={samu} alt="" className="userImage" />
            ) : (
              <img
                src={`https://gallery-store-api.vercel.app/${userd.avatar}`}
                alt=""
                className="userImage"
              />
            )}
          </div>
        ) : (
          <div className="userImage" onClick={() => setIsModalOpen(true)}>
            {userd.avatar === "samuel.png" ? (
              <img src={samu} alt="" className="userImage" />
            ) : (
              <img
                src={`https://gallery-store-api.vercel.app/${userd.avatar}`}
                alt=""
                className="userImage"
              />
            )}
          </div>
        )}
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

      {/* {uploadData.map((data, index) => {})}*/}
      <div className="many_pics_container">
        {uploadData.map((uploadItems, i) => {
          return (
            <div key={i}>
              <div className="pic_card">
                <img src={uploadItems.image} alt="" className="myPic" />
                <FiHeart className="likeBtn" />
                <a href={uploadItems.image} download>
                  <BsDownload className="downloadBtn" />
                </a>
                <p className="caption">{uploadItems.caption}</p>
              </div>
            </div>
          );
        })}
      </div>
      <Navbar />
      <Modal isOpen={isModalOpen} />
    </div>
  );
};

export default Home;
