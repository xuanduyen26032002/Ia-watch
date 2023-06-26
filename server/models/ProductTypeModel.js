import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    productTypeName: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const ProductTypeModel = mongoose.model("ProductType", schema);
