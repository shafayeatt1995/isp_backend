const { check } = require("express-validator");

const validate = {
  businessCreateVal: [
    check("name").trim().notEmpty().withMessage("Name is required"),
    check("exp").custom((value, { req }) => {
      if (!value || typeof value !== "object") {
        throw new Error("Expired at is required");
      }

      const { year, month, day } = value;

      if (
        typeof year !== "number" ||
        typeof month !== "number" ||
        typeof day !== "number"
      ) {
        throw new Error("Expired at must be a valid date");
      }

      const date = new Date(year, month - 1, day);
      if (
        date.getFullYear() !== year ||
        date.getMonth() !== month - 1 ||
        date.getDate() !== day
      ) {
        throw new Error("Invalid expired at");
      }

      req.body.expire = new Date(date);

      return true;
    }),
  ],
};

module.exports = validate;
