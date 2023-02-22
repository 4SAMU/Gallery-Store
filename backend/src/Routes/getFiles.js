/** @format */
const express = require("express");
const router = express.Router();

const imageCaption = require("../../Database/models/imageCaption");

router.get("/", (req, res) => {
  imageCaption.find({}, (err, files) => {
    if (err) throw err;
    res.status(200).json({ files });
  });
});

module.exports = router;
