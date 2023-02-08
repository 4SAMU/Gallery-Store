/** @format */

import React, { useEffect, useState } from "react";
import "./Home.css";
import samu from "../../assets/samu.jpeg";
import Navbar from "../Navabar/Navbar";

import { FiHeart } from "@react-icons/all-files/fi/FiHeart";
import { BsDownload } from "@react-icons/all-files/bs/BsDownload";
import Modal from "../ModalPopup/Modal";
import jwt from "jwt-decode";
import Delete from "../DeleteData/Delete";
import { toast } from "react-toastify";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [uploadData, setUploadData] = useState([]);
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [selectedCaptionId, setSelectedCaptionId] = useState(null);

  const token = localStorage.getItem("token");
  const userd = jwt(token);

  async function getFiles() {
    const response = await fetch(
      "https://gallery-store-api.vercel.app/getFiles"
    );
    // console.log(response);

    const data = await response.json();
    const myData = data.files;
    console.log(myData);
    const dataItems = await Promise.all(
      myData.map(async (index) => {
        const caption = index.caption;
        const image = `https://gallery-store-api.vercel.app/${index.image}`;
        const captionId = index._id;
        const imageId = index.image.slice(6);
        const items = {
          caption,
          image,
          captionId,
          imageId,
        };
        return items;
      })
    );
    setUploadData(dataItems.reverse());
    console.log(dataItems);
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
              <div className="userImage">
                {" "}
                <img src={samu} alt="" className="images" />
              </div>
            ) : (
              <div className="userImage">
                <img
                  src={`https://gallery-store-api.vercel.app/${userd.avatar}`}
                  alt=""
                  className="images"
                />
              </div>
            )}
          </div>
        ) : (
          <div className="userImage" onClick={() => setIsModalOpen(true)}>
            {userd.avatar === "samuel.png" ? (
              <div className="userImage">
                {" "}
                <img src={samu} alt="" className="images" />
              </div>
            ) : (
              <div className="userImage">
                <img
                  src={`https://gallery-store-api.vercel.app/${userd.avatar}`}
                  alt=""
                  className="images"
                />
              </div>
            )}
          </div>
        )}
      </div>

      <div className="many_pics_container">
        {uploadData.map((uploadItems, i) => {
          return (
            <div
              key={i}
              onDoubleClick={() => {
                setDeleteModalOpen(!isDeleteModalOpen);
                setSelectedImageId(uploadItems.imageId);
                setSelectedCaptionId(uploadItems.captionId);
                toast.error("You have entered a danger zone");
              }}
            >
              {/* <div className="pic_card">
                <img src={uploadItems.image} alt="" className="myPic" />

                <div className="myPic">
                  <img src={uploadItems.image} alt="" className="many_images" />
                </div>
                <div className="captionData">
                  <p className="caption">{uploadItems.caption}</p>
                </div>
                <div className="data">
                  <a href={uploadItems.image} download={uploadItems.image}>
                    <BsDownload className="downloadBtn" />
                  </a>
                  <FiHeart className="likeBtn" />
                </div>
              </div>*/}
              <div className="pic_card">
                <img src={uploadItems.image} alt="" className="many_images" />
                <div className="button_container">hello</div>
                <div className="button_container">hello</div>
              </div>
            </div>
          );
        })}
      </div>
      <Navbar />
      <Modal isOpen={isModalOpen} />
      <Delete
        deleteModal={isDeleteModalOpen}
        imageId={selectedImageId}
        captionId={selectedCaptionId}
        closeModal={() => setDeleteModalOpen(false)}
      />
    </div>
  );
};

export default Home;
