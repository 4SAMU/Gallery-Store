/** @format */
require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const { PORT } = process.env;

const server = http.createServer(app);

const io = new Server(server, {
  origins:
    "https://gallery-store.vercel.app:* https://gallery-store.vercel.app:*",
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  // Emit the user_connected event to the client to notify that a new user has connected

  socket.on("connect_user", (username) => {
    socket.username = username;
    socket.broadcast.emit("user_connected", username);
    console.log(`${username} is online`);
  });

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`user with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
    console.log("data\n ::::", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`);
});
