/** @format */
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const User = require("../models/userModel");
const avatarImage = require("../models/avatarImage");
const imageUpload = require("../models/imageUplaod");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const multer = require("multer");
// const path = require("path");

const app = express();
const upload = multer();

const { PORT, MONGODB_URL } = process.env;

//Middlewares
app.use(cors());
app.use(express.json());

//Connect to DB
mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB...");
  });

app.post("/register", upload.single("avatar"), async (req, res) => {
  try {
    const newPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: newPassword,
      avatar: req.file ? req.file.filename : "",
    });
    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error", error: "Duplicate email", issue: err });
  }
});

app.post("/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    res.json("error");
  } else {
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (isPasswordValid) {
      const token = jwt.sign(
        {
          name: user.name,
          email: user.email,
          avatar: user.avatar,
        },
        "secret123"
      );

      res.set("Authorization", token);
      return res.json({ status: "ok", user: token });
    } else {
      return res.json({ status: "error", user: false });
    }
  }
});

app.put("/update");

app.post(
  "/avatar",
  (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  },
  upload.single("file"),
  (req, res) => {
    const file = req.file;

    // Create a new MongoDB document with the file data
    const newFile = new avatarImage({
      contentType: file.mimetype,
      data: file.buffer,
    });

    // Save the document in the "files" collection
    newFile.save((err, savedFile) => {
      if (err) throw err;
      console.log("File inserted into MongoDB");
      const fileUrl = `avatar/${savedFile._id}`;
      console.log(fileUrl);
      res.status(200).json({ fileUrl, status: "ok" });
    });
  }
);

app.get("/files/:id", (req, res) => {
  const id = req.params.id;

  imageUpload.findById(id, (err, file) => {
    if (err) throw err;
    if (!file) {
      return res.status(404).send("File not found");
    }
    res.contentType(file.contentType);
    res.send(file.data);
  });
});

app.get("/avatar/:id", (req, res) => {
  const id = req.params.id;

  avatarImage.findById(id, (err, file) => {
    if (err) throw err;
    if (!file) {
      return res.status(404).send("File not found");
    }
    res.contentType(file.contentType);
    res.send(file.data);
  });
});

//Server listening to routes
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
