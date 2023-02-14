/** @format */
require("dotenv").config();
const express = require("express");
const app = express();
const https = require("https");
const cors = require("cors");
const { Server } = require("socket.io");
const fs = require("fs");
app.use(cors());

const { PORT } = process.env;

const options = {
  key: fs.readFileSync("./cert/key.pem"),
  cert: fs.readFileSync("./cert/cert.pem"),
};

const server = https.createServer(options, app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
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
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`);
});
