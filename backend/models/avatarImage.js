/** @format */

const mongoose = require("mongoose");

const AvatarImage = new mongoose.Schema({
  contentType: { type: String },
  data: { type: Buffer },
});

module.exports = mongoose.model("avatarUpload", AvatarImage);
