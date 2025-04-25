const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: String,
  description: String,
  ingredients: [String],
  image: String,
}, {
  collection: 'recipebook' // Force it to use 'recipebook' collection
});

module.exports = mongoose.model("Recipe", recipeSchema);
