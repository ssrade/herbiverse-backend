const mongoose = require("mongoose");
const asyncHandler = require("../utils/asyncHandler");
const Favourite = require("../models/favourite.model");
const Plant = require("../models/plant.model"); // Ensure Plant model is imported

// ✅ Add a plant to favourites
const addFavourite = asyncHandler(async (req, res) => {
  console.log("📥 Incoming Request Body:", req.body);

  const { plantId } = req.body;

  // 🔹 Check if plantId is provided
  if (!plantId) {
    return res.status(400).json({ error: "Plant ID is required" });
  }

  // 🔹 Validate plantId format (MongoDB ObjectId)
  if (!mongoose.Types.ObjectId.isValid(plantId)) {
    return res.status(400).json({ error: "Invalid Plant ID format" });
  }

  // 🔹 Check if the plant actually exists in the database
  const plantExists = await Plant.findById(plantId);
  if (!plantExists) {
    return res.status(404).json({ error: "Plant not found" });
  }

  // 🔹 Check if the plant is already in favourites
  const isAlreadyFavourite = await Favourite.findOne({ user: req.user.id, plant: plantId });
  if (isAlreadyFavourite) {
    return res.status(400).json({ error: "Plant is already in favourites" });
  }

  try {
    // ✅ Add to Favourites
    const favourite = await Favourite.create({
      user: req.user.id, // Ensure user is authenticated
      plant: plantId,
    });

    console.log("✅ Favourite Added:", favourite);
    res.status(201).json(favourite);
  } catch (error) {
    console.error("🔥 ERROR Adding Favourite:", error);
    res.status(500).json({ error: "Server Error", details: error.message });
  }
});

// ✅ Get all favourite plants of the logged-in user
const getFavourites = asyncHandler(async (req, res) => {
  try {
    const favourites = await Favourite.find({ user: req.user.id }).populate("plant");
    res.status(200).json(favourites);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch favourites", details: error.message });
  }
});

// ✅ Check if a specific plant is in favourites
const checkFavourite = asyncHandler(async (req, res) => {
  const { id: plantId } = req.params;
  
  // 🔹 Validate plantId format (MongoDB ObjectId)
  if (!mongoose.Types.ObjectId.isValid(plantId)) {
    return res.status(400).json({ error: "Invalid Plant ID format" });
  }

  try {
    // Check if the plant is in the user's favourites
    const favourite = await Favourite.findOne({ 
      user: req.user.id, 
      plant: plantId 
    });
    
    // Send back a boolean response
    res.status(200).json({ 
      isFavourite: !!favourite,
      plantId: plantId
    });
  } catch (error) {
    console.error("🔥 ERROR Checking Favourite:", error);
    res.status(500).json({ error: "Failed to check favourite status", details: error.message });
  }
});

// ✅ Remove a plant from favourites
const removeFavourite = asyncHandler(async (req, res) => {
  const { id: plantId } = req.params;

  // 🔹 Validate the Plant ID format
  if (!mongoose.Types.ObjectId.isValid(plantId)) {
    return res.status(400).json({ error: "Invalid Plant ID format" });
  }

  try {
    const favourite = await Favourite.findOneAndDelete({
      user: req.user.id,
      plant: plantId,
    });

    if (!favourite) {
      return res.status(404).json({ error: "Favourite not found" });
    }

    res.json({ message: "Favourite removed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error removing favourite", details: error.message });
  }
});

module.exports = { addFavourite, getFavourites, removeFavourite, checkFavourite };
