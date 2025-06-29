const express = require("express");
const { User, Package } = require("../../models");
const { paginate, toggle } = require("../../utils");
const { userEditVal } = require("../../validation/user");
const { validation } = require("../../validation");
const { packageCreateVal } = require("../../validation/package");
const router = express.Router();

router.post("/fetch", async (req, res) => {
  try {
    const { page, perPage, keyword, searchBy, sort } = req.body;
    const matchQuery = {};
    if (keyword) matchQuery[searchBy] = { $regex: keyword, $options: "i" };

    const [packages, total] = await Promise.all([
      Package.aggregate([
        { $match: matchQuery },
        { $sort: sort },
        ...paginate(page, perPage),
        {
          $project: {
            refID: 0,
          },
        },
      ]),
      Package.countDocuments(matchQuery),
    ]);
    return res.send({ packages, total });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
});
router.post("/toggle-suspend", async (req, res) => {
  try {
    const { _id } = req.user;
    const { user } = req.body;
    await User.updateOne(
      { $and: [{ _id: user._id }, { _id: { $ne: _id } }] },
      toggle("suspended")
    );
    return res.send({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
});
router.post("/batch-toggle-suspend", async (req, res) => {
  try {
    const { _id } = req.user;
    const { ids, suspend } = req.body;
    await User.updateMany(
      { _id: { $in: ids, $ne: _id } },
      { suspended: suspend }
    );
    return res.send({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
});
router.post("/batch-delete", async (req, res) => {
  try {
    const { ids } = req.body;
    await Package.deleteMany({ _id: { $in: ids }, refID: "admin" });
    return res.send({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
});
router.post("/delete", async (req, res) => {
  try {
    const { pack } = req.body;
    await Package.deleteOne({ _id: pack._id, refID: "admin" });
    return res.send({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
});
router.post("/add", packageCreateVal, validation, async (req, res) => {
  try {
    const { name, staticIP, price, vatType, vatAmount } = req.body;
    await Package.create({
      refID: "admin",
      name,
      staticIP,
      price,
      vatType,
      vatAmount,
    });
    return res.send({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
});
router.post("/edit", packageCreateVal, validation, async (req, res) => {
  try {
    const { _id, name, staticIP, price, vatType, vatAmount } = req.body;
    await Package.updateOne(
      { _id },
      { name, staticIP, price, vatType, vatAmount }
    );

    return res.send({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
