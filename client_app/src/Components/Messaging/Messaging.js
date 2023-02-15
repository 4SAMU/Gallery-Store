/** @format */

import React, { useEffect, useState } from "react";
import "./Messaging.css";
import { MdSend } from "@react-icons/all-files/md/MdSend";
import Navbar from "../Navabar/Navbar";
import ScrollToBottom from "react-scroll-to-bottom";
import { toast } from "react-toastify";

const Messaging = ({ socket, room, username }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [isOnline, setIsOnline] = useState("online");
  const [messageList, setMessageList] = useState(
    JSON.parse(localStorage.getItem("messages")) || []
  );

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      // setMessageList(messageData);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    // Send the username to the server
    socket.emit("connect_user", username);

    // Listen for the user_connected event from the server
    socket.off("connect_user");
    socket.on("user_connected", (user) => {
      if (user !== username) {
        setIsOnline(`${user} is online`);
      }
    });
  }, [socket]);

  useEffect(() => {
    // simulate setting the user as online after 2 seconds
    const timeoutId = setTimeout(() => {
      setIsOnline("online");
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isOnline]);

  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messageList));
  }, [messageList]);
  useEffect(() => {
    socket.off("receive_message");
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="msg">
      <div className="msg_container">
        <ScrollToBottom className="msg_room">
          {messageList.map((messageContent, i) => {
            return (
              <div
                key={i}
                id={username === messageContent.author ? "sender" : "receiver"}
              >
                <div className="message_content">
                  {messageContent.message}
                  <div className="message_content_meta">
                    <p className="name">{messageContent.author}</p>
                    <p className="time">{messageContent.time}</p>
                  </div>
                </div>
                <br />
              </div>
            );
          })}
        </ScrollToBottom>
        <input
          className="msg_input"
          placeholder="hey..."
          value={currentMessage}
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button className="sendBtn" onClick={sendMessage}>
          <MdSend />
        </button>
      </div>
      {isOnline !== "online" ? <div className="isOnline">{isOnline}</div> : ""}

      <Navbar />
    </div>
  );
};

export default Messaging;
