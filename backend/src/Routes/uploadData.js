/** @format */
const express = require("express");
const router = express.Router();

const imageCaption = require("../../Database/models/imageCaption");

router.post("/", async (req, res) => {
  try {
    await imageCaption.create({
      caption: req.body.caption,
      image: req.body.imageUrl,
    });
    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error", issue: err });
  }
});

module.exports = router;
