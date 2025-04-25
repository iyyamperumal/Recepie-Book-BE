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
app.use(cors());
app.use(express.json());

app.use("/api/recipes", recipeRoutes);
app.use("/images", express.static("images"));
app.use("/images", express.static(path.join(__dirname, "images")));

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("Connected to MongoDB Atlas");
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
})
.catch((err) => console.error("MongoDB connection error:", err));



