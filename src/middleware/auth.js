const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const asyncHandler = require("../utils/asyncHandler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  console.log("🔍 Headers Received:", req.headers); // Debugging

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1]; // Get token after "Bearer"
      console.log("✅ Extracted Token:", token);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("✅ Decoded Token:", decoded);

      req.user = await User.findById(decoded.id).select("-password");
      if (!req.user) {
        console.error("🚨 User not found in database!");
        return res.status(401).json({ message: "Not authorized, user not found" });
      }

      return next();
    } catch (error) {
      console.error("🚨 JWT Verification Failed:", error.message);
      return res.status(401).json({ message: "Not authorized, token invalid" });
    }
  }

  console.error("🚨 No Authorization Header Found");
  return res.status(401).json({ message: "Not authorized, no token" });
});

module.exports = { protect };
