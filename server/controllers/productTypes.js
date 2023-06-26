import { ProductTypeModel } from "../models/ProductTypeModel.js";

export const getProductTypes = async (req, res) => {
  try {
    const productTypes = await ProductTypeModel.find();
    res.status(200).json(productTypes);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getProductType = async (req, res) => {
  const { _id } = req.body;
  try {
    const productType = await ProductTypeModel.findOne({ _id: _id });
    res.status(200).json({ success: true, data: productType });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};

export const searchByProductTypeName = async (req, res) => {
  const { keyword } = req.body;

  try {
    const productTypes = await ProductTypeModel.find();

    var matchedProductType = [];

    productTypes.forEach((productType) => {
      if (
        productType.productTypeName
          .toLowerCase()
          .includes(keyword.toLowerCase())
      )
        matchedProductType.push(productType);
    });

    res.status(200).json(matchedProductType);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const createProductType = async (req, res) => {
  const { productTypeName, description } = req.body;

  if (!productTypeName || !description) {
    return res
      .status(400)
      .json({ success: false, message: "Vui lòng nhập đầy đủ thông tin !" });
  }

  const productTypeNameChecked = await ProductTypeModel.findOne({
    productTypeName,
  });
  if (productTypeNameChecked)
    return res
      .status(400)
      .json({ success: false, message: "Tên Product Type đã bị trùng !" });

  try {
    const newProductType = req.body;
    const productType = new ProductTypeModel(newProductType);
    await productType.save();

    res.status(200).json(productType);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const updateProductType = async (req, res) => {
  const { productTypeName, description } = req.body;

  if (!productTypeName || !description) {
    return res
      .status(400)
      .json({ success: false, message: "Vui lòng nhập đầy đủ thông tin !" });
  }

  const productTypeNameChecked = await ProductTypeModel.findOne({
    productTypeName,
  });
  if (
    productTypeNameChecked &&
    productTypeNameChecked.productTypeName !== productTypeName
  )
    return res
      .status(400)
      .json({ success: false, message: "Tên Product Type đã bị trùng !" });

  try {
    const updateProductType = req.body;

    const productType = await ProductTypeModel.findByIdAndUpdate(
      { _id: req.params._id },
      updateProductType
    );

    res.status(200).json(productType);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

//Xóa hết toàn bộ sản phẩm liên quan luôn
export const deleteProductType = async (req, res) => {
  try {
    await ProductTypeModel.findByIdAndDelete(req.params._id);

    res.status(200).json("Product type has been deleted !");
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};
