const express = require("express");
const router = express.Router();
const { User } = require("../models");

router.get("/anik", async (req, res) => {
  try {
    res.send("Hello World!");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.use("/auth", require("./auth"));

module.exports = router;
