/** @format */

import React, { useEffect, useState } from "react";
import "./Messaging.css";
import { MdSend } from "@react-icons/all-files/md/MdSend";
import Navbar from "../Navabar/Navbar";
import ScrollToBottom from "react-scroll-to-bottom";
import { toast } from "react-toastify";

const Messaging = ({ socket, room, username }) => {
  const [currentMessage, setCurrentMessage] = useState("");
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
    socket.off("user_connected");
    socket.on("user_connected", (user) => {
      toast.info(`${user} is online`);
    });
  }, [socket, username]);

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
    <div>
      <div className="msg_container">
        <ScrollToBottom className="msg_room">
          {messageList.map((messageContent, i) => {
            return (
              <div
                key={i}
                id={username === messageContent.author ? "you" : "other"}
              >
                <div className="message_content">{messageContent.message}</div>
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
      <Navbar />
    </div>
  );
};

export default Messaging;
