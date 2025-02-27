const Plant = require("../models/plant.model");
const asyncHandler = require("../utils/asyncHandler");
const fs = require("fs");
const path = require("path");

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

// Get a specific plant by name
const getPlantByName = asyncHandler(async (req, res) => {
  const plantName = req.params.name;
  
  if (!plantName) {
    res.status(400);
    throw new Error("Plant name is required");
  }
  
  // Create a case-insensitive regex to match the plant name
  const nameRegex = new RegExp(`^${plantName}$`, 'i');
  
  const plant = await Plant.findOne({ name: nameRegex });
  
  if (!plant) {
    res.status(404);
    throw new Error("Plant not found");
  }
  
  res.status(200).json(plant);
});

// Search plants by partial name
const searchPlants = asyncHandler(async (req, res) => {
  const { query } = req.query;
  
  let filter = {};
  if (query) {
    filter = {
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { scientificName: { $regex: query, $options: 'i' } }
      ]
    };
  }
  
  const plants = await Plant.find(filter);
  res.status(200).json(plants);
});

// Import plants from JSON file
const importPlantsFromJSON = asyncHandler(async (req, res) => {
  try {
    const plantsDataPath = path.join(__dirname, '..', 'data', 'plants.json');
    const plantsData = JSON.parse(fs.readFileSync(plantsDataPath, 'utf8'));
    
    const results = {
      success: [],
      failure: []
    };
    
    for (const plantData of plantsData) {
      try {
        if (!plantData.name || !plantData.scientificName || 
            !plantData.description || !plantData.modelPath || 
            !plantData.careInstructions) {
          results.failure.push({
            plant: plantData.name || 'Unknown',
            error: 'Missing required fields'
          });
          continue;
        }
        
        // Check for existing plant
        const existingPlant = await Plant.findOne({ name: plantData.name });
        if (existingPlant) {
          results.failure.push({
            plant: plantData.name,
            error: 'Plant already exists'
          });
          continue;
        }
        
        const plant = await Plant.create(plantData);
        results.success.push(plant.name);
      } catch (error) {
        results.failure.push({
          plant: plantData.name || 'Unknown',
          error: error.message
        });
      }
    }
    
    res.status(201).json({
      totalProcessed: plantsData.length,
      successCount: results.success.length,
      failureCount: results.failure.length,
      details: results
    });
  } catch (error) {
    res.status(500);
    throw new Error(`Import failed: ${error.message}`);
  }
});

module.exports = { 
  addPlant, 
  getPlants, 
  getPlantById, 
  getPlantByName,
  searchPlants,
  importPlantsFromJSON 
};