/** @format */

import React, { useState } from "react";
import Navbar from "../Navabar/Navbar";
import "./Upload.css";
import "../ProfileUpdate/Profile.css";
import TransclucentBg from "../LoaderTransclucentBg/TransclucentBg";

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [caption, setCaption] = useState("");

  const [fileImage, setFile] = useState();
  function inputFileHandler(e) {
    setSelectedFile(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  async function uploadImage(event) {
    const file = selectedFile;
    const formData = new FormData();
    formData.append("file", file);

    setIsModalOpen(true);
    event.preventDefault();

    const response = await fetch(
      "https://gallery-store-api.vercel.app/UploadImage",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    console.log("here", data);
  }

  return (
    <div className="Page">
      <div className="profile_container">
        <div className="UpdateProfile">Upload Image</div>
        {selectedFile ? (
          <div>
            <img src={fileImage} alt="" className="UpdateImage_imageArea" />
          </div>
        ) : (
          <div className="UpdateImage_imageArea">
            <div className="image_icon">
              <input
                type={"file"}
                className="file-input"
                onChange={inputFileHandler}
              />
            </div>
          </div>
        )}
        <p className="addCaption">Add Caption</p>
        <textarea className="addCaption_textArea" placeholder="your caption" />
        <button className="Upload_Btn" onClick={uploadImage}>
          Upload
        </button>
      </div>
      <TransclucentBg isOpen={isModalOpen} />
      <Navbar />
    </div>
  );
};

export default Upload;
