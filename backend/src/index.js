/** @format */

const express = require("express");
const app = express();
const cors = require("cors");
const User = require("../models/user.model");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");

require("dotenv").config();

const { PORT, MONGODB_URL } = process.env;

//Middlewares
app.use(cors());
app.use(express.json());

// Set up Multer for image storage
const storage = multer.diskStorage({
  destination: "public/uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1000000 }, // set max file size to 1MB
});

//Connect to DB
const URL = MONGODB_URL;
mongoose.connect(URL).then(() => {
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

app.put("/update", upload.single("avatar"), async (req, res) => {
  const token = req.body.token;
  console.log(token);
  if (!token) {
    return res.status(400).json({ status: "error", error: "Token missing" });
  }

  try {
    const decoded = jwt.verify(token, "secret123");
    const email = decoded.email;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.json({ status: "error", error: "user not found" });
    } else {
      if (req.body.password) {
        const newPassword = await bcrypt.hash(req.body.password, 10);
        user.password = newPassword;
      }
      user.name = req.body.name;
      user.email = req.body.email;
      user.avatar = req.file ? req.file.filename : user.avatar;
      console.log(req.file);

      await user.save();
      const tokenUpdate = jwt.sign(
        {
          name: user.name,
          email: user.email,
          avatar: user.avatar,
        },
        "secret123"
      );
      res.json({ status: "ok", user: tokenUpdate });
    }
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});

//Server listening to routes
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
