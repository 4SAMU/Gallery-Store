/** @format */

require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const mongoose = require("mongoose");

const Message = require("./Models/messageSchema");
app.use(cors());

const { PORT, MONGODB_URI } = process.env;

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB...");
  });

const server = http.createServer(app);

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

  socket.on("send_message", async (data) => {
    const messageData = new Message({
      message: data.message,
      author: data.author,
      room: data.room,
      time: data.time,
      randomId: data.randomId,
    });

    const newMessage = await messageData.save();
    console.log(newMessage);
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

app.get("/messages", async (req, res) => {
  const messages = await Message.find().sort("-timestamp").limit(50);
  res.json(messages);
});

app.delete("/deleteMessage/:id", async (req, res) => {
  const id = req.params.id;
  Message.findByIdAndDelete(id, (err, deletedMessages) => {
    if (err)
      return res.status(500).json({ status: "error", message: err.message });
    if (!deletedMessages)
      return res
        .status(404)
        .json({ status: "error", message: "message not found" });

    res
      .status(200)
      .json({ status: "ok", message: "message deleted successfully" });
  });
});

app.delete("/deleteMessageByRID/:randomId", async (req, res) => {
  const randomId = req.params.randomId;
  Message.findOneAndDelete({ randomId }, (err, deletedMessage) => {
    if (err)
      return res.status(500).json({ status: "error", message: err.message });
    if (!deletedMessage)
      return res
        .status(404)
        .json({ status: "error", message: "message not found" });

    res
      .status(200)
      .json({ status: "ok", message: "message deleted successfully" });
  });
});

server.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`);
});
