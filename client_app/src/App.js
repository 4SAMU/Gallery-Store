/** @format */

import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import Loading from "./Components/loaderBeforeStart/Loading";
import Login from "./Components/Login/Login";
import Profile from "./Components/ProfileUpdate/Profile";
import Signup from "./Components/Signup/Signup";
import Upload from "./Components/UploadImage/Upload";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="" element={<Loading />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Signup" element={<Signup />}></Route>
        <Route path="/Home" element={<Home />}></Route>
        <Route path="/Profile" element={<Profile />}></Route>
        <Route path="/UploadPic" element={<Upload />}></Route>
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default App;
