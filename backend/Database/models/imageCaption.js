/** @format */

const mongoose = require("mongoose");

const imageCaption = new mongoose.Schema({
  caption: { type: String, required: true },
  image: { type: String, required: true },
});

module.exports = mongoose.model("imageCaption", imageCaption);
