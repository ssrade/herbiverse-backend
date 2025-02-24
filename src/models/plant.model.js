const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  scientificName: { type: String, required: true },
  description: { type: String, required: true },
  modelPath: { type: String, required: true },
  careInstructions: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Plant", plantSchema);
