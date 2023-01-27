/** @format */

import React from "react";
import { Route, Routes } from "react-router-dom";
import withLoading from "./Components/loaderBeforeStart/Loader";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/Signup" element={<Signup />}></Route>
      </Routes>
    </div>
  );
};

export default withLoading(App);
