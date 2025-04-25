import express from "express";
import path from "path";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import recipeRoutes from "./routes/recipes.js";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/recipes", recipeRoutes);

// Serve static images
app.use("/images", express.static(path.join(__dirname, "images")));

// Test route
app.get("/", (req, res) => {
  res.send("Recipe Book Backend is running 🚀");
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Connected to MongoDB Atlas");
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on http://localhost:${process.env.PORT || 5000}`);
  });
})
.catch((err) => console.error("MongoDB connection error:", err));
