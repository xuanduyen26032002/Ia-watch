import { UserModel } from "../models/UserModel.js";
import { ProductModel } from "../models/ProductModel.js";

export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getUser = async (req, res) => {
  const { _id } = req.body;
  try {
    const user = await UserModel.findOne({ _id: _id });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const createUser = async (req, res) => {
  const { fullName, userName, password, phoneNumber, email, address } =
    req.body;

  if (!fullName || !userName || !password || !phoneNumber || !email || !address)
    return res
      .status(400)
      .json({ success: false, message: "Vui lòng nhập đầy đủ thông tin !" });

  //check username
  const userNameChecked = await UserModel.findOne({ userName });
  if (userNameChecked)
    return res
      .status(400)
      .json({ success: false, message: "Tên đăng nhập đã bị trùng !" });

  // check email
  const emailChecked = await UserModel.findOne({ email });
  if (emailChecked)
    return res
      .status(400)
      .json({ success: false, message: "Email đã bị trùng !" });

  //check sdt
  const phoneNumberChecked = await UserModel.findOne({ phoneNumber });
  if (phoneNumberChecked)
    return res
      .status(400)
      .json({ success: false, message: "Số điện thoại đã bị trùng !" });

  try {
    const newUser = req.body;

    const user = new UserModel(newUser);
    await user.save();

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const updateUser = async (req, res) => {
  const {
    fullName,
    userName,
    password,
    phoneNumber,
    email,
    address,
    userType,
  } = req.body;

  if (
    !fullName ||
    !userName ||
    !password ||
    !phoneNumber ||
    !email ||
    !address ||
    !userType
  )
    return res
      .status(400)
      .json({ success: false, message: "Vui lòng nhập đầy đủ thông tin !" });

  // check email
  const emailChecked = await UserModel.findOne({ email });
  if (emailChecked && emailChecked.userName !== userName)
    return res
      .status(400)
      .json({ success: false, message: "Email đã bị trùng !" });

  //check sdt
  const phoneNumberChecked = await UserModel.findOne({ phoneNumber });
  if (phoneNumberChecked && phoneNumberChecked.userName !== userName)
    return res
      .status(400)
      .json({ success: false, message: "Số điện thoại đã bị trùng !" });

  try {
    const updateUser = req.body;

    const user = await UserModel.findByIdAndUpdate(
      { _id: req.params._id },
      updateUser
    );

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await UserModel.findByIdAndDelete(req.params._id);

    res.status(200).json("User has been deleted !");
  } catch (err) { 
    res.status(500).json({ success: false, error: err });
  }
};

export const signInForAdmin = async (req, res) => {
  const { userName, password } = req.body;

  if (!userName || !password)
    return res
      .status(400)
      .json({ success: false, message: "Vui lòng điền đầy đủ thông tin !" });

  try {
    //check username
    const userNameChecked = await UserModel.findOne({ userName });
    if (!userNameChecked)
      return res
        .status(400)
        .json({ success: false, message: "Sai tên đăng nhập !" });

    if (userNameChecked.password !== password)
      return res
        .status(400)
        .json({ success: false, message: "Sai mật khẩu !" });

    if (userNameChecked.userType !== "Admin")
      return res.status(400).json({
        success: false,
        message: "Vui lòng đăng nhập bằng tài khoản quản trị !",
      });

    // const accessToken = jwt.sign(
    //   { userId: user._id },
    //   process.env.ACCESS_TOKEN
    // );
    res.status(200).json({
      success: true,
      data: userNameChecked,
      message: "Đăng nhập thành công !",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error !!!" });
  }
};

export const signIn = async (req, res) => {
  const { userName, password } = req.body;

  if (!userName || !password)
    return res
      .status(400)
      .json({ success: false, message: "Vui lòng điền đầy đủ thông tin !" });

  try {
    //check username
    const userNameChecked = await UserModel.findOne({ userName });
    if (!userNameChecked)
      return res
        .status(400)
        .json({ success: false, message: "Sai tên đăng nhập hoặc mật khẩu !" });

    // const passwordValid = await argon2.verify(user.password, password);
    if (userNameChecked.password !== password)
      return res
        .status(400)
        .json({ success: false, message: "Sai tên đăng nhập hoặc mật khẩu !" });

    // const accessToken = jwt.sign(
    //   { userId: user._id },
    //   process.env.ACCESS_TOKEN
    // );
    res.status(200).json({
      success: true,
      data: userNameChecked,
      message: "Đăng nhập thành công !",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error !!!" });
  }
};

export const signUp = async (req, res) => {
  const { fullName, userName, password, phoneNumber, email, address } =
    req.body;

  if (!fullName || !userName || !password || !phoneNumber || !email || !address)
    return res
      .status(400)
      .json({ success: false, message: "Vui lòng nhập đầy đủ thông tin !" });

  //check user
  const userNameChecked = await UserModel.findOne({ userName });
  if (userNameChecked)
    return res
      .status(400)
      .json({ success: false, message: "Tên đăng nhập đã bị trùng !" });

  //check email
  const emailChecked = await UserModel.findOne({ email });
  if (emailChecked)
    return res
      .status(400)
      .json({ success: false, message: "Email đã bị trùng !" });

  //check sdt
  const phoneNumberChecked = await UserModel.findOne({ phoneNumber });
  if (phoneNumberChecked)
    return res
      .status(400)
      .json({ success: false, message: "Số điện thoại đã bị trùng !" });

  try {
    const newUser = req.body;

    const user = new UserModel(newUser);
    await user.save();

    res.status(200).json(user);
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error !!!" });
  }
};

//Cart
export const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    const foundProduct = await ProductModel.findOne({ _id: productId });

    const foundUser = await UserModel.findOne({ _id: userId });

    const cloneCart = [...foundUser.cart];

    const foundIndex = cloneCart.findIndex((item) => {
      return item.product.productName === foundProduct.productName;
    });

    if (foundIndex === -1) {
      const cartItem = { product: foundProduct, quantity: quantity };
      cloneCart.push(cartItem);
    } else {
      cloneCart[foundIndex].quantity += quantity;
    }

    foundUser.cart = cloneCart;

    const user = await UserModel.findByIdAndUpdate({ _id: userId }, foundUser);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      success: false,
      data: req.body,
      message: "Internal server error !!!",
    });
  }
};

export const increaseQuantityInCart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const foundProduct = await ProductModel.findOne({ _id: productId });

    const foundUser = await UserModel.findOne({ _id: userId });

    const cloneCart = [...foundUser.cart];

    const foundIndex = cloneCart.findIndex((item) => {
      return item.product.productName === foundProduct.productName;
    });

    cloneCart[foundIndex].quantity++;

    foundUser.cart = cloneCart;

    const user = await UserModel.findByIdAndUpdate({ _id: userId }, foundUser);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      success: false,
      data: req.body,
      message: "Internal server error !!!",
    });
  }
};

export const decreaseQuantityInCart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const foundProduct = await ProductModel.findOne({ _id: productId });

    const foundUser = await UserModel.findOne({ _id: userId });

    const cloneCart = [...foundUser.cart];

    const foundIndex = cloneCart.findIndex((item) => {
      return item.product.productName === foundProduct.productName;
    });

    if (cloneCart[foundIndex].quantity === 1) {
      cloneCart.splice(foundIndex, 1);
    } else {
      cloneCart[foundIndex].quantity--;
    }

    foundUser.cart = cloneCart;

    const user = await UserModel.findByIdAndUpdate({ _id: userId }, foundUser);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      success: false,
      data: req.body,
      message: "Internal server error !!!",
    });
  }
};

export const deleteCart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const foundProduct = await ProductModel.findOne({ _id: productId });

    const foundUser = await UserModel.findOne({ _id: userId });

    const cloneCart = [...foundUser.cart];

    const foundIndex = cloneCart.findIndex((item) => {
      return item.product.productName === foundProduct.productName;
    });

    cloneCart.splice(foundIndex,1);
    
    foundUser.cart = cloneCart;

    const user = await UserModel.findByIdAndUpdate({ _id: userId }, foundUser);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      success: false,
      data: req.body,
      message: "Internal server error !!!",
    });
  }
};
