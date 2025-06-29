const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { userRoles } = require("../utils/payload");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    id: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, select: false },
    pass: { type: String, required: true, select: false },
    avatar: { type: String, default: "/1.webp" },
    suspended: { type: Boolean, default: false, select: false },
    power: { type: Number, default: 1, select: false },
    type: {
      type: String,
      required: true,
      enum: userRoles,
    },
    mobile: { type: String, default: "" },
  },
  {
    strict: true,
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

UserSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  user.password = bcrypt.hashSync(user.password, 10);
  next();
});

module.exports = mongoose.model("User", UserSchema);
