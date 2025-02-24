const asyncHandler = require("../utils/asyncHandler");
const Note = require("../models/note.model");

// ✅ Add a new note
const addNote = asyncHandler(async (req, res) => {
  const { plantId, content } = req.body;

  if (!plantId || !content) {
    res.status(400);
    throw new Error("Plant ID and content are required");
  }

  const note = await Note.create({
    user: req.user.id, // Get user from auth middleware
    plant: plantId,
    content,
  });

  res.status(201).json(note);
});

// ✅ Get all notes for the logged-in user
const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user.id }).populate("plant");
  res.status(200).json(notes);
});

// ✅ Update a note
const updateNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    res.status(404);
    throw new Error("Note not found");
  }

  if (note.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized to update this note");
  }

  note.content = req.body.content || note.content;
  await note.save();

  res.json(note);
});

// ✅ Delete a note
const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    res.status(404);
    throw new Error("Note not found");
  }

  if (note.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized to delete this note");
  }

  await note.remove();
  res.json({ message: "Note removed" });
});

module.exports = { addNote, getNotes, updateNote, deleteNote };
