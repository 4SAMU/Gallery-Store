/** @format */

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./Components/Login/Login.css";

import { BrowserRouter } from "react-router-dom";
import Video from "./utils/Video";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Video />
    </BrowserRouter>
  </React.StrictMode>
);
