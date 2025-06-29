const { check } = require("express-validator");
const { User } = require("../models");

const validate = {
  userCreateVal: [
    check("name").trim().notEmpty().withMessage("Name is required"),
    check("id")
      .trim()
      .notEmpty()
      .withMessage("ID is required")
      .custom(async (value) => {
        const user = await User.findOne({ id: value }).lean();
        if (user) {
          throw new Error("ID already used");
        }
      }),
    check("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 4 })
      .withMessage("Password must be at least 4 characters"),
    check("type")
      .trim()
      .isIn(["user", "reseller", "admin"])
      .withMessage("Type is required"),
  ],
  userEditVal: [
    check("name").trim().notEmpty().withMessage("Name is required"),
    check("id")
      .trim()
      .notEmpty()
      .withMessage("ID is required")
      .custom(async (value, { req }) => {
        const user = await User.findOne({
          id: value,
          _id: { $ne: req.body._id },
        });
        if (user) {
          throw new Error("ID already used");
        }
      }),
    check("password")
      .optional({ checkFalsy: true })
      .trim()
      .isLength({ min: 4 })
      .withMessage("Password must be at least 4 characters"),
    check("type")
      .trim()
      .isIn(["user", "reseller", "admin"])
      .withMessage("Type is required"),
  ],
};

module.exports = validate;
