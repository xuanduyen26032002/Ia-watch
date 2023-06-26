import { ProductModel } from "../models/ProductModel.js";

export const getProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();
    // console.log("products", products);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const searchByProductType = async (req, res) => {
  const { _id } = req.body;

  try {
    const products = await ProductModel.find();

    var matchedProduct = [];

    products.forEach((product) => {
      if (product.productTypeId === _id) matchedProduct.push(product);
    });

    res.status(200).json(matchedProduct);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const searchByName = async (req, res) => {
  const { keyword } = req.body;

  try {
    const products = await ProductModel.find();

    var matchedProduct = [];

    products.forEach((product) => {
      if (product.productName.toLowerCase().includes(keyword.toLowerCase()))
        matchedProduct.push(product);
    });

    res.status(200).json(matchedProduct);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const createProduct = async (req, res) => {
  const { productName } = req.body;

  const productNameChecked = await ProductModel.findOne({
    productName,
  });

  if (productNameChecked && productNameChecked.productName !== productName)
    return res
      .status(400)
      .json({ success: false, message: "Tên Product đã bị trùng !" });

  try {
    const newProduct = req.body;

    const product = new ProductModel(newProduct);
    await product.save();

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const updateProduct = async (req, res) => {
  const { productName } = req.body;

  const productNameChecked = await ProductModel.findOne({
    productName,
  });
  if (productNameChecked && productNameChecked.productName !== productName)
    return res
      .status(400)
      .json({ success: false, message: "Tên Product đã bị trùng !" });

  try {
    const updateProduct = req.body;

    const product = await ProductModel.findByIdAndUpdate(
      { _id: updateProduct._id },
      updateProduct
    );

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await ProductModel.findByIdAndDelete(req.params._id);

    res.status(200).json("Product has been deleted !");
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};
