const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BusinessSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    logo: { type: String, default: "/2.webp" },
    adminIDs: { type: [Schema.Types.ObjectId], default: [] },
  },
  {
    strict: true,
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

module.exports = mongoose.model("Business", BusinessSchema);
