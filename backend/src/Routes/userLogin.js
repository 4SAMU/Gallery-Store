/** @format */
require("dotenv").config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../../Database/models/userModel");
const { SECRET } = process.env;

router.post("/", async (req, res) => {
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
        SECRET
      );

      return res.json({ status: "ok", user: token });
    } else {
      return res.json({ status: "error", user: false });
    }
  }
});

module.exports = router;
