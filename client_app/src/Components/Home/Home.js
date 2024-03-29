/** @format */

import React, { useEffect, useState } from "react";
import "./Home.css";
import samu from "../../assets/samu.jpeg";
import Navbar from "../Navabar/Navbar";

import { FaHeart } from "@react-icons/all-files/fa/FaHeart";
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
  const [loading, setLoading] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);

  const token = localStorage.getItem("token");
  const userd = jwt(token);

  async function getFiles() {
    setDataFetched(false);
    const response = await fetch(
      "https://gallery-store-api.vercel.app/getFiles"
    );

    const data = await response.json();
    const myData = data.files;
    const dataItems = await Promise.all(
      myData.map(async (index) => {
        const caption = index.caption;
        const image = `https://gallery-store-api.vercel.app/${index.image}`;
        const captionId = index._id;
        const imageId = index.image.slice(6);
        const data = await getLikesById(captionId);

        const items = {
          caption,
          image,
          captionId,
          imageId,
          likes: data.likes,
          status: data.status,
        };
        return items;
      })
    );
    setUploadData(dataItems.reverse());
    setDataFetched(true);
  }

  const handleDownload = async (url, imageId) => {
    setLoading(true);
    const link = document.createElement("a");
    link.href = await toDataURL(url);
    link.download = `Gallery-store_${imageId}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setLoading(false);
  };

  const toDataURL = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  };

  //get likes of a post by id
  async function getLikesById(postId) {
    let email = userd.email;
    const response = await fetch(
      `https://gallery-store-api.vercel.app/likes/getLikesById?postId=${postId}&email=${email}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    return data;
  }

  //handle likes
  async function handleLikes(postId) {
    const response = await fetch("https://gallery-store-api.vercel.app/likes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId,
        email: userd.email,
      }),
    });
    const data = await response.json();
    if ((data.status = "like now")) {
      setDataFetched(true);
      getFiles();
    }
  }

  useEffect(() => {
    if (!dataFetched) {
      getFiles();
    }
  }, [dataFetched]);

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
              <div className="pic_card">
                <img src={uploadItems.image} alt="" className="many_images" />
                <div className="captionData">
                  <p className="caption">{uploadItems.caption}</p>
                </div>
                <div className="data">
                  {!loading ? (
                    <BsDownload
                      className="downloadBtn"
                      onClick={() =>
                        handleDownload(uploadItems.image, uploadItems.imageId)
                      }
                    />
                  ) : (
                    <div className="dots_loader">
                      <span className="dot">.</span>
                      <span className="dot">.</span>
                      <span className="dot">.</span>
                      <span className="dot">.</span>
                    </div>
                  )}
                  {uploadItems.status === "already liked" ? (
                    <button className="likeBtn">
                      <span
                        style={{
                          color: "white",
                          fontSize: "10px",
                          left: "-30px",
                        }}
                      >
                        {" "}
                        {uploadItems.likes}
                      </span>
                      <FaHeart
                        style={{ color: "green", fontSize: "23px" }}
                        onClick={() => {
                          handleLikes(uploadItems.captionId);
                        }}
                      />
                    </button>
                  ) : (
                    <button className="likeBtn">
                      <span
                        style={{
                          color: "white",
                          fontSize: "10px",
                          left: "-30px",
                        }}
                      >
                        {" "}
                        {uploadItems.likes}
                      </span>
                      <FiHeart
                        style={{ color: "green", fontSize: "23px" }}
                        onClick={() => {
                          handleLikes(uploadItems.captionId);
                        }}
                      />
                    </button>
                  )}
                </div>
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
