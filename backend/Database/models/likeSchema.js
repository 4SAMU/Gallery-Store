/** @format */

const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema({
  post: { type: String },
  email: { type: String },
  likes: { type: Number },
});

module.exports = mongoose.model("LikeSchema", LikeSchema);
