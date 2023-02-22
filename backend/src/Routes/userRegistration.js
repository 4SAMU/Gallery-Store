/** @format */

const express = require("express");
const router = express.Router();
const multer = require("multer");
const bcrypt = require("bcryptjs");
const User = require("../../Database/models/userModel");
const upload = multer();

router.post("/", upload.single("avatar"), async (req, res) => {
  try {
    const newPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: newPassword,
      avatar: req.body.avatarUrl ? req.body.avatarUrl : "samuel.png",
    });
    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error", error: "Duplicate email", issue: err });
  }
});

module.exports = router;


