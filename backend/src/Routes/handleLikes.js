/** @format */

const express = require("express");
const router = express.Router();
const Likes = require("../../Database/models/likeSchema");

router.post("/", async (req, res) => {
  const user = req.body.email;
  const postId = req.body.postId;

  // check if the user has already liked the post
  const existingLike = await Likes.findOne({ email: user, post: postId });

  if (existingLike) {
    res.json({ success: false, status: "error", error: "already liked" });
    return;
  }

  // increment the like count for the post
  const updatedLike = await Likes.findOneAndUpdate(
    { post: postId },
    { $inc: { likes: 1 } },
    { new: true }
  );

  if (updatedLike) {
    // create a new like object for the user if the post has not been liked before
    const newLike = new Likes({
      post: postId,
      email: user,
      likes: 1,
    });

    await newLike.save();
    res.json({ success: true, status: "ok", likes: newLike.likes });
  } else {
    const newLike = new Likes({
      post: postId,
      email: user,
      likes: 1,
    });

    await newLike.save();
    res.json({ success: true, status: "ok", likes: newLike.likes });
  }
});


router.get("/getLikesById", async (req, res) => {
  const { email, postId } = req.query;
  const likesCount = await Likes.countDocuments({ post: postId });

  const like = await Likes.findOne({ email, post: postId });

  if (like) {
    res.json({
      success: false,
      status: "already liked",
      likes: likesCount,
    });
    return;
  }

  res.json({ status: "like now", likes: likesCount });
});

router.get("/getLikes", async (req, res) => {
  const likes = await Likes.find().exec();
  res.status(200).json({ likes });
});

// router.get("/getLikesById", async (req, res) => {
//   const postId = req.query.postId;
//   const likesCount = await Likes.countDocuments({ post: postId });
//   res.status(200).json({ likes: likesCount });
// });

module.exports = router;
