import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      default: "Customer",
    },
    cart : {
      type : Array,
      default: [],
    }
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("User", schema);
