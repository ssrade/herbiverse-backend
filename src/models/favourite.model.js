const mongoose = require("mongoose");

const FavoriteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  plantId: { type: mongoose.Schema.Types.ObjectId, ref: "Plant", required: true }
});

module.exports = mongoose.model("Favorite", FavoriteSchema);
