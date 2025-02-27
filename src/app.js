const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const app = express();

// Fix CORS configuration to allow credentials
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://your-production-url.com' // Use your production URL
    : 'http://localhost:5173', // Frontend dev server
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/users", require("./routes/user.routes"));
app.use("/api/plants", require("./routes/plant.routes"));
app.use("/api/favourite", require("./routes/favourite.routes"));
app.use("/api/notes", require("./routes/note.routes"));

module.exports = app;