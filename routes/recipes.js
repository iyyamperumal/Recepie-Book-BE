import { Router } from "express";
import Recipe from "../models/Recipe.js";

const router = Router();

// Create a recipe
router.post("/", async (req, res) => {
  try {
    const { title, description, ingredients, image } = req.body;
    if (!title || !description || !ingredients || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newRecipe = new Recipe({ title, description, ingredients, image });
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(500).json({ message: "Failed to create recipe", error });
  }
});

// Get all recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch recipes", error });
  }
});

// Get a recipe by ID
router.get("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch recipe", error });
  }
});

// Update a recipe
router.put("/:id", async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRecipe) return res.status(404).json({ message: "Recipe not found" });
    res.status(200).json(updatedRecipe);
  } catch (error) {
    res.status(500).json({ message: "Failed to update recipe", error });
  }
});

// Delete a recipe
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Recipe.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Recipe not found" });
    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete recipe", error });
  }
});

export default router;
