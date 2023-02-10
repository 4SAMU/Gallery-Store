/** @format */

import React, { useState, useEffect } from "react";

const GoogleSignIn = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    loadGoogleApiClient();
  }, []);

  const loadGoogleApiClient = () => {
    gapi.load("auth2", function () {
      gapi.auth2
        .init({
          client_id: "YOUR_GOOGLE_CLIENT_ID",
          scope: "profile email",
        })
        .then(() => {
          const user = gapi.auth2.getAuthInstance().currentUser.get();
          if (user.isSignedIn()) {
            setIsSignedIn(true);
            const idToken = user.getAuthResponse().id_token;
            const profile = user.getBasicProfile();
            setUserData({
              idToken,
              name: profile.getName(),
              imageUrl: profile.getImageUrl(),
              email: profile.getEmail(),
            });
          }
        });
    });
  };

  const handleSignIn = () => {
    gapi.auth2
      .getAuthInstance()
      .signIn()
      .then(() => {
        setIsSignedIn(true);
        const user = gapi.auth2.getAuthInstance().currentUser.get();
        const idToken = user.getAuthResponse().id_token;
        const profile = user.getBasicProfile();
        setUserData({
          idToken,
          name: profile.getName(),
          imageUrl: profile.getImageUrl(),
          email: profile.getEmail(),
        });
      });
  };

  const handleSignOut = () => {
    gapi.auth2
      .getAuthInstance()
      .signOut()
      .then(() => {
        setIsSignedIn(false);
        setUserData({});
      });
  };

  return (
    <div>
      {isSignedIn ? (
        <button onClick={handleSignOut}>Sign Out</button>
      ) : (
        <button onClick={handleSignIn}>Sign In with Google</button>
      )}
      {isSignedIn && (
        <div>
          <h2>Welcome {userData.name}</h2>
          <img src={userData.imageUrl} alt={userData.name} />
          <p>Email: {userData.email}</p>
        </div>
      )}
    </div>
  );
};

export default GoogleSignIn;
