import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    cart : {
      type : Array,
      require : true,
    },
    userId: {
      type: String,
      required: true,
    },
    recipientAddress: {
      type: String,
      required: true,
    },
    recipient: {
      type: String,
      required: true,
    },
    recipientPhoneNumber: {
      type: String,
      required: true,
    },
    orderStatus: {
      type: String,
      required: true,
    },
    payment: {
      type: String,
      required: true,
    },
    totalPrice : {
      type : Number,
      required : true,
    }
  },
  { timestamps: true }
);

export const OrderModel = mongoose.model("Order", schema);
