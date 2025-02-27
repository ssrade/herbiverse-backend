const express = require("express");
const { 
  addPlant, 
  getPlants, 
  getPlantById, 
  getPlantByName,
  searchPlants,
  importPlantsFromJSON 
} = require("../controllers/plant.controller");
const { protect } = require("../middleware/auth");

const router = express.Router();

// Create a plant (Requires authentication)
router.post("/", protect, addPlant);

// Get all plants (No authentication needed)
router.get("/", getPlants);

// Search plants by query (No authentication needed)
router.get("/search", searchPlants);

// Get a specific plant by name (No authentication needed)
// IMPORTANT: This route must be defined BEFORE the /:id route
// Otherwise Express will interpret 'name' as an ID
router.get("/name/:name", getPlantByName);

// Get a specific plant by ID (No authentication needed)
router.get("/:id", getPlantById);

// Import plants from JSON file (Requires authentication)
router.post("/import", protect, importPlantsFromJSON);

module.exports = router;