const express = require("express");
const { addPlant, getPlants, getPlantById } = require("../controllers/plant.controller");
const { protect } = require("../middleware/auth");  // Instead of authMiddleware


const router = express.Router();

// Create a plant (Requires authentication)
router.post("/", protect, addPlant);

// Get all plants (No authentication needed)
router.get("/", getPlants);

// Get a specific plant by ID (No authentication needed)
router.get("/:id", getPlantById);

module.exports = router;
