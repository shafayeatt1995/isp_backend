const express = require("express");
const router = express.Router();
const { User } = require("../models");

router.get("/", async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id);
    res.send({ user: { user, ...req.user } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
