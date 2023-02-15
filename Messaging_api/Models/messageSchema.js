/** @format */

const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  message: String,
  author: String,
  room: String,
  time: String,
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
