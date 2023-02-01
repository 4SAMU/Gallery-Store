/** @format */

const mongoose = require("mongoose");

const Image = new mongoose.Schema({
  contentType: { type: String },
  data: { type: Buffer },
});

module.exports = mongoose.model("imageUpload", Image);
