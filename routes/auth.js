const express = require("express");
const { loginValidation } = require("../validation/auth");
const { validation } = require("../validation");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/login", loginValidation, validation, async (req, res) => {
  try {
    const { _id, id, power, type } = req.user;
    const payload = {
      _id,
      id,
    };

    if (power === 420 && type === "admin") payload.type = "admin";
    const token = jwt.sign(payload, process.env.AUTH_SECRET, {
      expiresIn: "30 days",
    });

    return res.json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
