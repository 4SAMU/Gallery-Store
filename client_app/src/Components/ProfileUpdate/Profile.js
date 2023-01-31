/** @format */

import React, { useState } from "react";
import Navbar from "../Navabar/Navbar";
import TransclucentBg from "../LoaderTransclucentBg/TransclucentBg";
import "./Profile.css";

const Profile = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [fileImage, setFile] = useState();
  function inputFileHandler(e) {
    setSelectedFile(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  //   console.log(selectedFile.name);
  return (
    <div className="Page">
      <div className="profile_container">
        <div className="UpdateProfile">Update Profile</div>
        {selectedFile ? (
          <div>
            <img src={fileImage} alt="" className="UpdateProfile_imageArea" />
          </div>
        ) : (
          <div className="UpdateProfile_imageArea">
            <div className="image_icon">
              <input
                type={"file"}
                className="file-input"
                onChange={inputFileHandler}
              />
            </div>
          </div>
        )}
        <input
          className="input_updateprofile"
          type={"text"}
          placeholder="name"
        />
        <input
          className="input_updateprofile"
          type={"email"}
          placeholder="email"
        />
        <input
          className="input_updateprofile"
          type={"password"}
          placeholder="password"
        />
        <button
          className="UpdateProfile_Btn"
          onClick={() => setIsModalOpen(true)}
        >
          Update{" "}
        </button>
      </div>
      <Navbar />
      <TransclucentBg isOpen={isModalOpen} />
    </div>
  );
};

export default Profile;
