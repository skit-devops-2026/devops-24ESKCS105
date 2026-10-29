
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import studentRoutes from "./routes/students.js";
import authRoutes from "./routes/auth.js";


// Load environment variables from .env
dotenv.config();

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Check whether the API is running
app.get("/", (req, res) => {
  res.json({
    message: "SkillSwapify API is running"
  });
});


// Connect the student and authentication routes
app.use("/api/students", studentRoutes);
app.use("/api/auth", authRoutes);


// Set the server port
const port = process.env.PORT || 5000;


// Connect to MongoDB before starting the server
mongoose
  .connect(
    process.env.MONGO_URI ||
    "mongodb://127.0.0.1:27017/skillswapify"
  )
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(port, () => {
      console.log(`API running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    console.error("Start MongoDB and check server/.env");

    process.exit(1);
  });
