import mongoose from "mongoose";
import { truncate } from "fs";
import { type } from "os";
const { ObjectId } = mongoose.Schema.Types;

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },

    fooditems: [
      {
        type: Object,
        require: true,
      },
    ],

    email: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    total: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
