const express = require("express");
const router = express.Router();
const { User } = require("../models");
const isAuthenticated = require("../middleware/isAuthenticated");

router.get("/anik", async (req, res) => {
  try {
    return res.send("Hello World!");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.use("/auth", require("./auth"));

router.use(isAuthenticated);
router.use("/user", require("./user"));
router.use("/admin", require("./admin"));

module.exports = router;
