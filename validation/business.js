const { check } = require("express-validator");

const validate = {
  businessCreateVal: [
    check("name").trim().notEmpty().withMessage("Name is required"),
  ],
};

module.exports = validate;
