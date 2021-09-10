const mongoose = require("mongoose");

const quote = new mongoose.Schema(
  {
    quote: { type: String, rqeuired: true },
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("quote", quote);
