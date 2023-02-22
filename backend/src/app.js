/** @format */
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const { PORT } = process.env;

//Connect to DB
require("../Database/connection");

//routes
const userRegistration = require("./Routes/userRegistration");
const userLogin = require("./Routes/userLogin");
const updateUserDetails = require("./Routes/updateUserDetails");
const avatar = require("./Routes/userAvatarUpload");
const uploadImage = require("./Routes/UploadImage");
const likes = require("./Routes/handleLikes");
const getFiles = require("./Routes/getFiles");
const UploadData = require("./Routes/uploadData");
const files = require("./Routes/filesById");
const deleteCaptionData = require("./Routes/deleteCaptionData");
const deleteImageUpload = require("./Routes/deleteImageUpload");
const deleteAvatar = require("./Routes/deleteAvatar");

//Middlewares
app.use(cors());
app.use(express.json());
app.use("/likes", likes);
app.use("/register", userRegistration);
app.use("/login", userLogin);
app.use("/update", updateUserDetails);
app.use("/avatar", avatar);
app.use("/UploadImage", uploadImage);
app.use("/getFiles", getFiles);
app.use("/UploadData", UploadData);
app.use("/files", files);
app.use("/deleteCaptionData", deleteCaptionData);
app.use("/deleteImageUpload", deleteImageUpload);
app.use("/deleteAvatar", deleteAvatar);

//starting endpoint showing the html file
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

//Server listening to routes
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
