import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      unique: true,
    },
    productTypeId: {
      type: String,
      required: true,
    },
    productImage: {
      type: Array,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    warrantyTime: {
      type: Number,
      required: true,
    },
    faceSize: {
      type: Number,
      required: true,
    },
    thickness: {
      type: Number,
      required: true,
    },
    faceColor: {
      type: String,
      required: true,
    },
    machineType: {
      type: String,
      required: true,
    },
    wireSize: {
      type: Number,
      required: true,
    },
    glassSurface: {
      type: String,
      required: true,
    },
    ropeMaterial: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const ProductModel = mongoose.model("Product", schema);
