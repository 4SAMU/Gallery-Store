/** @format */

import React, { useState } from "react";
import Navbar from "../Navabar/Navbar";
import TransclucentBg from "../LoaderTransclucentBg/TransclucentBg";
import "./Profile.css";
import jwt from "jwt-decode";
import { toast } from "react-toastify";

const Profile = () => {
  const [busy, setBusy] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token = localStorage.getItem("token");
  const userd = jwt(token);

  console.log(userd);

  const [formParams, updateFormParams] = useState({
    name: userd.name,
    email: userd.email,
    password: "",
  });

  const [fileImage, setFile] = useState();
  function inputFileHandler(e) {
    setSelectedFile(e.target.files[0]);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  async function userAvatar() {
    const file = selectedFile;
    const formData = new FormData();
    formData.append("file", file);
    if (!file) {
      toast.warn("select an image to continue");
    } else {
      try {
        setBusy(true);
        setIsModalOpen(true);
        const response = await fetch(
          "https://gallery-store-api.vercel.app/avatar",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
        // console.log(data);

        if (data.status === "error") {
          setBusy(false);
          setIsModalOpen(false);
          toast.warn(data.error);
        }
        return data.fileUrl;
      } catch (error) {
        setIsModalOpen(false);
        setBusy(false);
        toast.warn(error);
      }
    }
  }

  async function updateUserData() {
    const { name, email, password } = formParams;
    const token = localStorage.getItem("token");

    const avatarUrl = await userAvatar();

    if (!avatarUrl) {
      // toast.warn("all fields must be filled");
      setBusy(false);
      setIsModalOpen(false);
    } else {
      try {
        setBusy(true);
        setIsModalOpen(true);
        const response = await fetch(
          "https://gallery-store-api.vercel.app/update",
          {
            method: "PUT",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              name,
              email,
              password,
              avatarUrl,
              token,
            }),
          }
        );

        const data = await response.json();
        console.log(data);

        if (data.status === "ok") {
          localStorage.setItem("token", data.user);
          toast.success("Profile updated");

          setTimeout(function () {
            // code to be executed after 3 seconds
            window.location.href = "/Home";
          }, 3000);

          // alert("status ok");
        } else if (data.status === "error") {
          setIsModalOpen(false);
          setBusy(false);
          toast.error(data.error);
        }
      } catch (error) {
        setIsModalOpen(false);
        setBusy(false);
        toast.error(data.error);
      }
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
            <img
              src={`https://gallery-store-api.vercel.app/${userd.avatar}`}
              alt=""
              className="UpdateProfile_imageArea"
            />
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
          id={formParams.name}
          value={formParams.name}
          onChange={(e) =>
            updateFormParams({ ...formParams, name: e.target.value })
          }
        />
        <input
          className="input_updateprofile"
          type={"email"}
          placeholder="email"
          id={formParams.email}
          value={formParams.email}
          onChange={(e) =>
            updateFormParams({ ...formParams, email: e.target.value })
          }
        />
        <input
          className="input_updateprofile"
          type={"password"}
          placeholder="password"
          id={formParams.password}
          value={formParams.password}
          onChange={(e) =>
            updateFormParams({ ...formParams, password: e.target.value })
          }
        />
        <button className="UpdateProfile_Btn" onClick={updateUserData}>
          {busy ? "loading..." : " Update"}
        </button>
      </div>
      <Navbar />
      <TransclucentBg isOpen={isModalOpen} />
    </div>
  );
};

export default Profile;
