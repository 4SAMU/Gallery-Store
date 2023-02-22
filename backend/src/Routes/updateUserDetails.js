/** @format */
require("dotenv").config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../../Database/models/userModel");
const { SECRET } = process.env;

router.put("/", async (req, res) => {
  const token = req.body.token;
  if (!token) {
    return res.status(400).json({ status: "error", error: "Token missing" });
  }
  try {
    const decoded = jwt.verify(token, SECRET);
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
      user.avatar = req.body.avatarUrl;

      await user.save();
      const tokenUpdate = jwt.sign(
        {
          name: user.name,
          email: user.email,
          avatar: user.avatar,
        },
        SECRET
      );
      res.json({ status: "ok", user: tokenUpdate });
    }
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "invalid token" });
  }
});

module.exports = router;
