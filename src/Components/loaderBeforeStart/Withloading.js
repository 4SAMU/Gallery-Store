/** @format */

import React, { useEffect, useState } from "react";
import "./Loader.css";

const withLoading = (WrappedComponent) => (props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      window.location.replace();
    }, 3000);
  }, []);

  if (loading) {
    return (
      <div className="LoadingPage">
        <div class="loading">
          <div class="loading-bar">Welcome to Gallery store</div>
        </div>
      </div>
    );
  }

  return <WrappedComponent {...props} />;
};

export default withLoading;
