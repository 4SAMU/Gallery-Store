/** @format */

import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import Loading from "./Components/loaderBeforeStart/Loading";
import Login from "./Components/Login/Login";
import Profile from "./Components/ProfileUpdate/Profile";
import Signup from "./Components/Signup/Signup";
import Upload from "./Components/UploadImage/Upload";

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
    </div>
  );
};

export default App;
