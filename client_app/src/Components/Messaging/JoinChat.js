/** @format */

import React, { useEffect, useState } from "react";
import "./Messaging.css";
import jwt from "jwt-decode";
import io from "socket.io-client";
import Messaging from "./Messaging";
const socket = io.connect("http://localhost:5000");

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
