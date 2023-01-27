/** @format */

import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import Loading from "./Components/loaderBeforeStart/Loading";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="" element={<Loading />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Signup" element={<Signup />}></Route>
        <Route path="/Home" element={<Home />}></Route>
      </Routes>
    </div>
  );
};

export default App;
