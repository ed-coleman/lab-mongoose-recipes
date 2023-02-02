const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    const goulash = {
      title: "Goulash",
      cuisine: "Hungarian",
      Duration: 120,
      dishType: "main_course",
    };
    Recipe.create(goulash)
      .then((newRecipe) => {
        console.log("Nice, you added a new recipe - goulash", newRecipe);
      })
      .catch((err) => {
        console.log("There was an error", err);
      });
    Recipe.insertMany(data)
      .then((newRecipeArr) => {
        console.log("You added an array of recipes", newRecipeArr);
      })
      .catch((err) => {
        console.log("There was an error", err);
      });
  })
   Recipe.findOneAndUpdate(
    { title: "Rigatoni alla Genovese" },
    { duration: 100 },
    { new: true }
  )
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });


