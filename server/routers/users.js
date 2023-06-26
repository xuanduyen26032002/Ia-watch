import express from "express";
import {
  getUsers,
  createUser,
  updateUser,
  signIn,
  signUp,
  signInForAdmin,
  deleteUser,
  getUser,
  addToCart,
  increaseQuantityInCart,
  decreaseQuantityInCart,
  deleteCart,
} from "../controllers/users.js";

const router = express.Router();
//http://localhost:5000/users

//For client
router.get("/", getUsers);

router.post("/userdetail", getUser);

router.post("/", createUser);

router.post("/update/:_id", updateUser);

router.delete("/delete/:_id", deleteUser);

router.post("/signin", signIn);

router.post("/signup", signUp);

//route
router.post("/cart/add", addToCart);
router.post("/cart/increasequantity", increaseQuantityInCart);
router.post("/cart/decreasequantity", decreaseQuantityInCart);
router.post("/cart/deletecart", deleteCart);


//For admin
router.post("/admin/signin", signInForAdmin);


export default router;
