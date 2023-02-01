/** @format */

import React, { useState } from "react";
import Navbar from "../Navabar/Navbar";
import TransclucentBg from "../LoaderTransclucentBg/TransclucentBg";
import "./Profile.css";

const Profile = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [fileImage, setFile] = useState();
  function inputFileHandler(e) {
    setSelectedFile(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  async function userAvatar(event) {
    // const tokenX = localStorage.getItem("token");

    const file = selectedFile;
    const formData = new FormData();
    formData.append("file", file);
    try {
      setIsModalOpen(true);
      event.preventDefault();
      const response = await fetch("http://localhost:5000/avatar", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(data);

      if (data.status === "ok") {
        setIsModalOpen(false);
        localStorage.setItem("token", data.user);
        window.location.replace("/Home");
        console.log(data);

        // alert("status ok");
      } else if (data.status === "error") {
        setIsModalOpen(false);
        alert(data.error);
      }
    } catch (error) {
      setIsModalOpen(false);
    }
  }
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
          id={name}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="input_updateprofile"
          type={"email"}
          placeholder="email"
          id={email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input_updateprofile"
          type={"password"}
          placeholder="password"
          id={password}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="UpdateProfile_Btn" onClick={userAvatar}>
          Update
        </button>
      </div>
      <Navbar />
      <TransclucentBg isOpen={isModalOpen} />
    </div>
  );
};

export default Profile;
