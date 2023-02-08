/** @format */

import React, { useEffect, useState } from "react";
import "./Loader.css";
import jwt from "jwt-decode";

const Loading = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const userd = jwt(token);
          if (userd) {
            window.location.replace("/Home");
          }
        } catch (error) {
          window.location.replace("/Login");
        }
      } else {
        window.location.replace("/Login");
      }
    }, 3000);
  }, []);

  if (loading) {
    return (
      <div className="LoadingPage">
        <div className="loading">
          <div className="loading-bar">Welcome to Gallery store</div>
        </div>
      </div>
    );
  }
};

export default Loading;
