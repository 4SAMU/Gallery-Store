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

  async function deleteMessageById(id) {
    await fetch(`http://localhost:5000/deleteMessage/${id}`, {
      method: "DELETE",
    })
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
    async function getAllMessages() {
      const response = await fetch(
        "https://loving-jasper-fuchsia.glitch.me/messages",
        {
          method: "GET",
        }
      );
      const data = await response.json();
      const dataItems = await Promise.all(
        data.map(async (index) => {
          const message = index.message;
          const author = index.author;
          const time = index.time;
          const room = index.room;
          const id = index._id;
          const items = {
            message,
            author,
            time,
            room,
            id,
          };
          return items;
        })
      );
      setMessageList(dataItems);
      localStorage.setItem("messages", JSON.stringify(dataItems));
    }
    getAllMessages();
  }, [messageList]);

  // useEffect(() => {
  //   localStorage.setItem("messages", JSON.stringify(messageList));
  // }, [messageList]);

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
                      "Are you sure you want to delete this message? Type 'YES' to confirm."
                    );
                    if (confirmDelete === "YES") {
                      deleteMessageById(messageContent.id);
                    }
                  }

                  const userName = prompt("Please enter your name:");
                  greetUser(userName);
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
