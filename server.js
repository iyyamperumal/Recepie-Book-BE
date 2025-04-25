const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cors());
app.use(express.json());

const recipeRoutes = require("./routes/recipes");
app.use("/api/recipes", recipeRoutes);
app.use("/images", express.static("images"));
app.use("/images", express.static(path.join(__dirname, "images")));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Connected to MongoDB Atlas");
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
})
.catch((err) => console.error("MongoDB connection error:", err));



