const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PackageSchema = new Schema(
  {
    refID: { type: Schema.Types.Mixed },
    name: { type: String, required: true, trim: true },
    staticIP: { type: Boolean, default: false },
    price: { type: Number, required: true },
    vatType: { type: String, enum: ["fixed", "percent"], default: "fixed" },
    vatAmount: { type: Number, default: 0 },
  },
  {
    strict: true,
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

module.exports = mongoose.model("Package", PackageSchema);
