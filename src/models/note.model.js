const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  plant: { type: mongoose.Schema.Types.ObjectId, ref: "Plant", required: true },
  content: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Note", noteSchema);
