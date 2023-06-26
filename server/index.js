import express from "express";
import cors from "cors";
import users from "./routers/users.js";
import products from "./routers/products.js";
import orders from "./routers/orders.js";

import productTypes from "./routers/productTypes.js";
import vouchers from "./routers/vouchers.js";
import comments from "./routers/comments.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const URI =
  "mongodb+srv://longnguyenn271012:longnguyenn271012@watch-shop-db.nj8je.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

app.use(cors());
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true, limit: "30mb" }));

app.use("/users", users);
app.use("/productType", productTypes);
app.use("/products", products);
app.use("/orders", orders);
app.use("/vouchers", vouchers);
app.use("/comments", comments);

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("err", err);
  });
