import mongoose, { models } from "mongoose";

const foodItemSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  mediaUrl: {
    type: String,
    required: true,
  },
  inStock: {
    type: Boolean,
    required: true,
    default: true,
  },
});

export default mongoose.models.FoodItem ||
  mongoose.model("FoodItem", foodItemSchema);
