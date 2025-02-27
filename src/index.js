const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config(); // Load environment variables at the top


// Import Routes
const userRoutes = require("./routes/user.routes");
const plantRoutes = require("./routes/plant.routes");
const favoriteRoutes = require("./routes/favourite.routes");
const noteRoutes = require("./routes/note.routes");

// Middleware Imports
const { errorHandler, notFound } = require("./middleware/errorMiddleware");

dotenv.config();
connectDB();

const app = express();
app.use(express.json()); // Allows JSON data in requests
app.use(cors()); // Enable CORS for frontend access

// Health Check Route
app.get("/", (req, res) => {
  res.send("🌱 Herbiverse Backend API is Running...");
});

// Register API Routes
app.use("/api/users", userRoutes);
app.use("/api/plants", plantRoutes);
app.use("/api/favourite", favoriteRoutes);
app.use("/api/notes", noteRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
