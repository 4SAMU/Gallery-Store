/** @format */

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const mongoose = require("mongoose");

require("dotenv").config();

// Connect to MongoDB Atlas
const db = process.env.MONGODB_URL;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB...");
  });

const app = express();
app.use(express.json());

const users = [];
const secret = "your_secret_here";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".jpg");
  },
});

const upload = multer({ storage: storage });

app.post("/register", (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({
      message: "Email, password, and name are required",
    });
  }

  if (users.find((user) => user.email === email)) {
    return res.status(400).json({
      message: "Email is already registered",
    });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  users.push({
    email,
    password: hashedPassword,
    name,
    image: null,
  });

  return res.status(201).json({
    message: "Registration successful",
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  const user = users.find((user) => user.email === email);

  if (!user) {
    return res.status(401).json({
      message: "Email or password is incorrect",
    });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(401).json({
      message: "Email or password is incorrect",
    });
  }

  const token = jwt.sign({ email }, secret, { expiresIn: "1h" });

  return res.status(200).json({
    message: "Login successful",
    token,
  });
});

app.put("/update-profile-image", upload.single("image"), (req, res) => {
  const { email } = req.body;
  const image = req.file.path;

  const userIndex = users.findIndex((user) => user.email === email);

  if (userIndex === -1) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  users[userIndex].image = image;

  return res.status(200).json({
    message: "Profile image updated",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
