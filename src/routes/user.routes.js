const express = require("express");
const { registerUser, loginUser, logoutUser, getUserProfile } = require("../controllers/user.controller");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/logout", protect, logoutUser); // Logout requires authentication
router.get("/profile", protect, getUserProfile); // New route to get user profile

module.exports = router;