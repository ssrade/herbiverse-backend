const mongoose = require("mongoose");

const favouriteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  plant: { type: mongoose.Schema.Types.ObjectId, ref: "Plant", required: true },
}, { timestamps: true });

module.exports = mongoose.model("Favourite", favouriteSchema);
