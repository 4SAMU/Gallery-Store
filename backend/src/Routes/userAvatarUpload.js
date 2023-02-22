/** @format */

const express = require("express");
const router = express.Router();
const avatarImage = require("../../Database/models/avatarImage");
const multer = require("multer");
const upload = multer();

router.post(
  "/",
  (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  },
  upload.single("file"),
  (req, res) => {
    const file = req.file;

    // Create a new MongoDB document with the file data
    const newFile = new avatarImage({
      contentType: file.mimetype,
      data: file.buffer,
    });

    // Save the document in the "files" collection
    newFile.save((err, savedFile) => {
      if (err) throw err;
      console.log("File inserted into MongoDB");
      const fileUrl = `avatar/${savedFile._id}`;
      console.log(fileUrl);
      res.status(200).json({ fileUrl, status: "ok" });
    });
  }
);

router.get("/:id", (req, res) => {
  const id = req.params.id;

  avatarImage.findById(id, (err, file) => {
    if (err) throw err;
    if (!file) {
      return res.status(404).send("File not found");
    }
    res.contentType(file.contentType);
    res.send(file.data);
  });
});

module.exports = router;
