import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes.js";
import catRoutes from "./routes/catRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import scoreRoutes from "./routes/scoreRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true, // required for the browser to send/receive the auth cookie
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/api/health", (req, res) => {
  res.json({
    message: "Big Cat Trivia API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/cats", catRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/scores", scoreRoutes);

// Unmatched /api/* routes
app.use("/api", (req, res) => {
  res.status(404).json({ message: "Not found." });
});

// Centralized error handler — catches anything passed to next(err),
// including asyncHandler rejections and Mongoose validation errors.
app.use((err, req, res, next) => {
  console.error(err);

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors)
      .map((e) => e.message)
      .join(" ");
    return res.status(400).json({ message });
  }

  if (err.code === 11000) {
    return res.status(409).json({ message: "That value is already in use." });
  }

  return res.status(500).json({ message: "Something went wrong." });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });