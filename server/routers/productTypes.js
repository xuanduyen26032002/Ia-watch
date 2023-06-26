import express from "express";
import {
  getProductTypes,
  createProductType,
  updateProductType,
  getProductType,
  deleteProductType,
  searchByProductTypeName,
} from "../controllers/productTypes.js";

const router = express.Router();
//http://localhost:5000/productType

router.get("/", getProductTypes);

router.post("/", createProductType);

router.post("/detail/", getProductType);

router.post("/searchbyname", searchByProductTypeName);

router.post("/update/:_id", updateProductType);

router.delete("/delete/:_id", deleteProductType);

export default router;
