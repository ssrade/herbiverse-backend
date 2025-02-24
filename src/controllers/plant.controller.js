const Plant = require("../models/plant.model");
const asyncHandler = require("../utils/asyncHandler");

// Add a new plant
const addPlant = asyncHandler(async (req, res) => {
  const { name, scientificName, description, modelPath, careInstructions } = req.body;

  if (!name || !scientificName || !description || !modelPath || !careInstructions) {
    res.status(400);
    throw new Error("All fields are required.");
  }

  const plant = await Plant.create({
    name,
    scientificName,
    description,
    modelPath,
    careInstructions
  });

  res.status(201).json(plant);
});

// Get all plants
const getPlants = asyncHandler(async (req, res) => {
  const plants = await Plant.find();
  res.status(200).json(plants);
});

// Get a specific plant by ID
const getPlantById = asyncHandler(async (req, res) => {
  const plant = await Plant.findById(req.params.id);
  if (!plant) {
    res.status(404);
    throw new Error("Plant not found");
  }
  res.status(200).json(plant);
});

module.exports = { addPlant, getPlants, getPlantById };
