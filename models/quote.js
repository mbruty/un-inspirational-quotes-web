const mongoose = require("mongoose");

const quote = new mongoose.Schema(
  {
    quote: { type: String, rqeuired: true },
    name: { type: String, required: true },
    reviewed: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("quote", quote);
