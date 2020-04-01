const { Schema, model } = require("mongoose");

const foodSchema = new Schema({
  foodsAvailable: [
    {
      type: String
    }
  ]
});

const Food = model("Food", foodSchema);

module.exports = Food;
