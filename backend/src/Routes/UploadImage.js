/** @format */

const express = require("express");
const router = express.Router();
const imageUpload = require("../../Database/models/imageUplaod");
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
    try {
      const file = req.file;

      // Create a new MongoDB document with the file data
      const newFile = new imageUpload({
        contentType: file.mimetype,
        data: file.buffer,
      });

      // Save the document in the "files" collection
      newFile.save((err, savedFile) => {
        if (err) throw err;
        console.log("File inserted into MongoDB");
        const fileUrl = `files/${savedFile._id}`;
        console.log(fileUrl);
        res.status(200).json({ fileUrl, status: "ok" });
      });
    } catch (error) {
      res.json({ error });
    }
  }
);


module.exports = router;
