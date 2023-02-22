/** @format */

const mongoose = require("mongoose");

const Video = new mongoose.Schema({
  contentType: { type: String },
  data: { type: Buffer },
});

module.exports = mongoose.model("myVideos", Video);
