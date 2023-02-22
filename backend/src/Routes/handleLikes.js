/** @format */

const express = require("express");
const router = express.Router();

router.get("/:id", async (req, res) => {
  //
  const id = req.params.id;
  res.json({ succes: true, param: id });
});

module.exports = router;
