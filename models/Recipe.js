import { Schema, model } from "mongoose";

const recipeSchema = new Schema({
  title: String,
  description: String,
  ingredients: [String],
  image: String,
}, {
  collection: 'recipebook' // Force it to use 'recipebook' collection
});

export default model("Recipe", recipeSchema);
