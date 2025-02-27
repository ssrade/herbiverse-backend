const express = require("express");
const { protect } = require("../middleware/auth");
const { addFavourite, removeFavourite, getFavourites, checkFavourite } = require("../controllers/favourite.controller");

const router = express.Router();

// ✅ Add a favourite plant (Requires Authentication)
router.post("/", protect, addFavourite);

// ✅ Get all favourite plants of a user (Requires Authentication)
router.get("/", protect, getFavourites);

// ✅ Check if a specific plant is in favourites (Requires Authentication)
router.get("/:id", protect, checkFavourite);

// ✅ Remove a favourite plant by ID (Requires Authentication)
router.delete("/:id", protect, removeFavourite);

module.exports = router;