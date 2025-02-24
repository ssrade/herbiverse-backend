const express = require("express");
const { protect } = require("../middleware/auth"); // Ensure auth middleware is correct
const noteController = require("../controllers/note.controller"); // Import the whole object

const router = express.Router();

// Add a new note
router.post("/", protect, noteController.addNote);

// Get all notes for a user
router.get("/", protect, noteController.getNotes);

// Update a note
router.put("/:id", protect, noteController.updateNote);

// Delete a note
router.delete("/:id", protect, noteController.deleteNote);

module.exports = router;
