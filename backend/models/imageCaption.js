/** @format */

const mongoose = require("mongoose");

const imageCaption = new mongoose.Schema({
  caption: { type: String, required: true },
  image: { type: String, required: false },
});

module.exports = mongoose.model("imageCaption", imageCaption);
