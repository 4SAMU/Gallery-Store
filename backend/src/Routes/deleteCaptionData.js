/** @format */

const express = require("express");
const router = express.Router();

const imageCaption = require("../../Database/models/imageCaption");

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  imageCaption.findByIdAndDelete(id, (err, deletedFile) => {
    if (err)
      return res.status(500).json({ status: "error", message: err.message });
    if (!deletedFile)
      return res
        .status(404)
        .json({ status: "error", message: "File not found" });

    res
      .status(200)
      .json({ status: "ok", message: "File deleted successfully" });
  });
});

module.exports = router;
