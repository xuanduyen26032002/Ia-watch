import express from "express";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  searchByProductType,
  searchByName,
} from "../controllers/products.js";

const router = express.Router();
//http://localhost:5000/products

router.get("/", getProducts);

// router.get("/productdetail", getProducts);

router.post("/searchbyproducttype", searchByProductType);

router.post("/searchbyname", searchByName);

router.post("/", createProduct);

router.post("/update/:_id", updateProduct);

router.delete("/delete/:_id", deleteProduct);

export default router;
