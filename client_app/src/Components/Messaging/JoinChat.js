/** @format */

import React, { useState } from "react";
import "./Messaging.css";
import jwt from "jwt-decode";
import Messaging from "./Messaging";

const { io } = require("socket.io-client");
const socket = io.connect("https://loving-jasper-fuchsia.glitch.me", {
  transports: ["websocket", "polling"],
  extraHeaders: {
    "my-custom-header": "1234", // ignored
  },
});

const room = 1;

const JoinChat = () => {
  const [showChat, setShowChat] = useState(false);

  const token = localStorage.getItem("token");
  const userd = jwt(token);

  const joinRoom = async () => {
    if (userd) {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div>
      {showChat ? (
        <Messaging socket={socket} room={room} username={userd.name} />
      ) : (
        <div>
          <Messaging socket={socket} room={room} username={userd.name} />
          <div className="joinChat">
            <div className="joinChat_box">
              <br />
              <span className="p">{userd.name}!, welcome to ChatRoom</span>
              <span
                className="joinChat_btn"
                onClick={() => {
                  joinRoom();
                }}
              >
                OK
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JoinChat;
