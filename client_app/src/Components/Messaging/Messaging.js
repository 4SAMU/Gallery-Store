/** @format */

import React, { useEffect, useState } from "react";
import "./Messaging.css";
import { MdSend } from "@react-icons/all-files/md/MdSend";
import Navbar from "../Navabar/Navbar";
import ScrollToBottom from "react-scroll-to-bottom";
// import { toast } from "react-toastify";

const Messaging = ({ socket, room, username }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [isOnline, setIsOnline] = useState("online");
  const [messageList, setMessageList] = useState(
    JSON.parse(localStorage.getItem("messages")) || []
  );

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const min = 1;
      const max = 100;
      const randomId = Math.floor(Math.random() * (max - min + 1) + min);
      const messageData = {
        randomId: randomId,
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

  async function deleteMessageByRID(randomId) {
    await fetch(
      `https://loving-jasper-fuchsia.glitch.me/deleteMessageByRID/${randomId}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

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

    // Fetch messages from the server
    fetch("https://loving-jasper-fuchsia.glitch.me/messages")
      .then((response) => response.json())
      .then((data) => {
        setMessageList(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [socket, username]);

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
                onDoubleClick={() => {
                  if (username === messageContent.author) {
                    const confirmDelete = prompt(
                      "Are you sure \n you want to delete this message? \n Type 'YES' to confirm."
                    );
                    if (confirmDelete === "YES") {
                      deleteMessageByRID(messageContent.randomId);
                    }
                  }
                }}
              >
                <div className="message_content">{messageContent.message}</div>
                <div className="message_content_meta">
                  <p className="name">{messageContent.author}</p>
                  <p className="time">{messageContent.time}</p>
                </div>

                <br />
              </div>
            );
          })}
        </ScrollToBottom>
        <input
          className="msg_input"
          placeholder="Message..."
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
