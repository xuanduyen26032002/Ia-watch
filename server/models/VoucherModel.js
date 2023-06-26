import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    voucherName: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    saleOff: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const VoucherModel = mongoose.model("Voucher", schema);
