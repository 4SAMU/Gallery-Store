/** @format */

import React from "react";
import "./Style.css";

const TransclucentBg = ({ isOpen }) => {
  return (
    <div className={`translucent_background ${isOpen ? "open" : "close"}`}>
      <div className="loaderSpiner_component">
        <div className="loaderSpiner" />
      </div>
    </div>
  );
};

export default TransclucentBg;
