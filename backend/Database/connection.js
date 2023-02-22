/** @format */

//Connect to DB
const mongoose = require("mongoose");
const { MONGODB_URL } = process.env;

mongoose.set("strictQuery", false);
module.exports = mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB...");
  });
