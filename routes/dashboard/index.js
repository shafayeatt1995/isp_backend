const express = require("express");
const router = express.Router();

router.use("/user", require("./user"));
router.use("/package", require("./package"));

module.exports = router;
