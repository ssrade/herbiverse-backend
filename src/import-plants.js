// import-plants.js
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Import your database configuration
require('./src/config/db');

// Import your Plant model - adjust the path if needed
const Plant = require('./src/models/plant.model');

// Path to your plants.json file
const plantsDataPath = path.join(__dirname, 'src', 'data', 'plants.json');

async function importPlants() {
  try {
    // Read the plants data from the JSON file
    const plantsData = JSON.parse(fs.readFileSync(plantsDataPath, 'utf8'));
    
    console.log(`Starting import of ${plantsData.length} plants...`);
    
    let successCount = 0;
    let failureCount = 0;
    
    for (const plantData of plantsData) {
      try {
        // Check if all required fields are present
        if (!plantData.name || !plantData.scientificName || 
            !plantData.description || !plantData.modelPath || 
            !plantData.careInstructions) {
          console.error(`Missing required fields for ${plantData.name || 'Unknown plant'}`);
          failureCount++;
          continue;
        }
        
        // Check if plant already exists to avoid duplicates
        const existingPlant = await Plant.findOne({ name: plantData.name });
        if (existingPlant) {
          console.log(`Plant ${plantData.name} already exists, skipping...`);
          continue;
        }
        
        // Create the plant in the database
        await Plant.create(plantData);
        console.log(`Successfully added ${plantData.name}`);
        successCount++;
      } catch (error) {
        console.error(`Failed to add ${plantData.name || 'Unknown plant'}:`, error.message);
        failureCount++;
      }
    }
    
    console.log(`Import complete. Success: ${successCount}, Failed: ${failureCount}`);
  } catch (error) {
    console.error('Import process failed:', error);
  } finally {
    // Disconnect from MongoDB after import is complete
    mongoose.disconnect();
    console.log('Database connection closed');
  }
}

// Run the import function
importPlants();