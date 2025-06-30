const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BusinessSchema = new Schema(
  {
    refName: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    logo: { type: String, default: "/2.webp" },
    ownerIDs: { type: [Schema.Types.ObjectId], default: [], ref: "User" },
    resellerIDs: { type: [Schema.Types.ObjectId], default: [], ref: "User" },
    exp: { type: Date, default: () => Date.now() },
  },
  {
    strict: true,
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

module.exports = mongoose.model("Business", BusinessSchema);
