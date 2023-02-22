/** @format */

const express = require("express");
const router = express.Router();
const Likes = require("../../Database/models/likeSchema");

router.post("/", async (req, res) => {
  const user = req.body.email;
  const post = req.body.postUrl;

  const like = await Likes.findOne({ email: user, post: post });

  if (like) {
    res.json({ success: false, status: "error", error: "already liked" });
    return;
  }

  const newLike = new Likes({
    post: post,
    email: user,
    likes: 1,
  });

  await newLike.save();

  res.json({ success: true, status: "ok" });
});

router.get("/canIlike", async (req, res) => {
  const user = req.query.email;
  const post = req.query.postUrl;

  const like = await Likes.findOne({ email: user, post: post });

  if (like) {
    res.json({ success: false, status: "error", error: "already liked" });
    return;
  }
  res.json({ status: "like now" });
});

router.get("/getLikes", async function (req, res) {
  Likes.find({}, (err, likes) => {
    if (err) throw err;
    res.status(200).json({ likes });
  });
});

module.exports = router;
