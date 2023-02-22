/** @format */
const express = require("express");
const router = express.Router();

const imageUpload = require("../../Database/models/imageUplaod");

router.get("/:id", (req, res) => {
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

module.exports = router;
