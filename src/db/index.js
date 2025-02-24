const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("🔍 MONGODB_URI:", process.env.MONGODB_URI);

    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in .env file");
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ Database Connection Failed", error);
    process.exit(1);
  }
};

module.exports = connectDB;
