const express = require("express");

const userRoutes = require("./user.routes");
const plantRoutes = require("./plant.routes"); // ✅ Added Plant Route
const favouriteRoutes = require("./favourite.routes");
const noteRoutes = require("./note.routes");

const router = express.Router();

// ✅ Register Routes
router.use("/users", userRoutes);
router.use("/plants", plantRoutes); // ✅ Added Plant Route
router.use("/favourites", favouriteRoutes);
router.use("/notes", noteRoutes);

module.exports = router;
