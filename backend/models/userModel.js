/** @format */

const mongoose = require("mongoose");

const User = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, required: false },
  contentType: { type: String },
  data: { type: Buffer },
});

module.exports = mongoose.model("UserRegistration", User);
