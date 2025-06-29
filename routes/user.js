const express = require("express");
const router = express.Router();
const { User } = require("../models");

router.get("/", async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await User.findOne({ _id, suspended: false }).lean();
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.send({ user: { ...user, ...req.user } });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
