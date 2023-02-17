/** @format */

import React, { useEffect, useState } from "react";
import "./Messaging.css";
import { MdSend } from "@react-icons/all-files/md/MdSend";
import Navbar from "../Navabar/Navbar";
import ScrollToBottom from "react-scroll-to-bottom";
import makeClickable from "../../utils/MakeClickable";
// import { toast } from "react-toastify";

const Messaging = ({ socket, room, username }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [isOnline, setIsOnline] = useState("online");
  const [updateState, setUpdatedState] = useState(true);
  // const [replyText, setReplyText] = useState("");
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

  async function deleteMessageByRID(randomId, index) {
    try {
      const response = await fetch(
        `https://loving-jasper-fuchsia.glitch.me/deleteMessageByRID/${randomId}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      if (data.status === "ok") {
        handleDeleteMessage(index);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchMessages() {
    // Fetch messages from the server
    fetch("https://loving-jasper-fuchsia.glitch.me/messages")
      .then((response) => response.json())
      .then((data) => {
        setMessageList(data);
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
    fetchMessages();
  }, [socket, username]);

  useEffect(() => {
    // if (updateState === false) {
    //   console.log(updateState);
    // }
    fetchMessages();
  }, [updateState]);

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
  }, [messageList, updateState]);

  useEffect(() => {
    socket.off("receive_message");
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  const handleDeleteMessage = (messageIndex) => {
    const updatedMessages = messageList.filter(
      (_, index) => index !== messageIndex
    );
    setUpdatedState(false);
    setMessageList(updatedMessages);
  };

  // const replyToMessage = (messageIndex) => {
  //   const selectedMessage = messageList[messageIndex];
  //   setReplyText(selectedMessage);
  //   console.log(selectedMessage.message);
  // };

  return (
    <div className="msg">
      <div className="msg_container">
        <ScrollToBottom className="msg_room">
          {messageList.map((messageContent, i) => {
            return (
              <div
                key={i}
                id={username === messageContent.author ? "sender" : "receiver"}
                // onClick={() => {
                //   replyToMessage(i);
                // }}
                onDoubleClick={() => {
                  if (username === messageContent.author) {
                    const confirmDelete = prompt(
                      "Are you sure you want to delete this message? Type 'YES' to confirm."
                    );
                    if (confirmDelete === "YES") {
                      deleteMessageByRID(messageContent.randomId, i);
                    }
                  }
                }}
              >
                {makeClickable(messageContent.message) ? (
                  <div>
                    <div className="message_content">
                      {makeClickable(messageContent.message)}
                    </div>
                    <div className="message_content_meta">
                      <p className="name">{messageContent.author}</p>
                      <p className="time">{messageContent.time}</p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="message_content">
                      {messageContent.message}
                    </div>
                    <div className="message_content_meta">
                      <p className="name">{messageContent.author}</p>
                      <p className="time">{messageContent.time}</p>
                    </div>
                  </div>
                )}
                <br />
                {/* <div className="reply">
                  <div className="message_content_reply" id="sender">
                    {replyText.message}
                  </div>
                  {"hey"}
                </div>*/}
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
