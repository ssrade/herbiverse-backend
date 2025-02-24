require("dotenv").config();
const app = require("./app");
const connectDB = require("./db");

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
git init