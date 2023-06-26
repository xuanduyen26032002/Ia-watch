import { OrderModel } from "../models/OrderModel.js";
import { ProductModel } from "../models/ProductModel.js";
import { UserModel } from "../models/UserModel.js";

export const getOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find();
    console.log("orders", orders);
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const createOrder = async (req, res) => {
  const { userId, recipientAddress, recipient, recipientPhoneNumber, payment } =
    req.body;
    
  const user = await UserModel.findOne({ _id: userId });

  const cloneCart = [...user.cart];

  //Neu cart rong thi khong duoc tao don
  if (cloneCart.length === 0) res.status(400).json("Giỏ hàng rỗng !");
  else
    try {
      //Tinh tong tien hoa don
      let totalPrice = 0;

      cloneCart.forEach(async (item) => {
        totalPrice += item.product.price * item.quantity;
      });

      const newOrder = {
        userId,
        cart: cloneCart,
        recipientAddress,
        recipient,
        recipientPhoneNumber,
        payment,
        orderStatus: "Waiting confirmation",
        totalPrice,
      };

      const order = new OrderModel(newOrder);
      await order.save();

      // Reset lai gio hang cho user
      user.cart.splice(0, user.cart.length);
      await UserModel.findByIdAndUpdate({ _id: userId }, user);

      res.status(200).json(order);
    } catch (err) {
      res.status(500).json({ error: err });
    }
};

export const confirmOrder = async (req, res) => {
  const { _id } = req.body;

  const updateOrder = await OrderModel.findOne({ _id });

  const cloneCart = [...updateOrder.cart];

  updateOrder.orderStatus = "Confirmed";

  try {
    cloneCart.forEach(async (item) => {
      var foundProduct = await ProductModel.findOne({
        _id: item.product._id,
      });

      // Giam so luong ton kho
      foundProduct.quantity = await (foundProduct.quantity - item.quantity);
      // Cap nhat lai tung san pham
      await ProductModel.findByIdAndUpdate(
        { _id: item.product._id },
        foundProduct
      );
    });

    const order = await OrderModel.findByIdAndUpdate({ _id }, updateOrder);

    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const deleteOrder = async (req, res) => {
  const updateOrder = await OrderModel.findOne({ _id: req.params._id });

  const cloneCart = [...updateOrder.cart];

  try {
    if (updateOrder.orderStatus === "Confirmed") {
      cloneCart.forEach(async (item) => {
        var foundProduct = await ProductModel.findOne({
          _id: item.product._id,
        });

        // Giam so luong ton kho
        foundProduct.quantity = await (foundProduct.quantity + item.quantity);
        // Cap nhat lai tung san pham
        await ProductModel.findByIdAndUpdate(
          { _id: item.product._id },
          foundProduct
        );
      });
    }
    await OrderModel.findByIdAndDelete(req.params._id);

    res.status(200).json("Order has been deleted !");
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};

export const getOrder = async (req, res) => {
  // const { _id } = req.body;

  try {
    const order = await OrderModel.findOne(req.params._id);
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getOrderHistory = async (req, res) => {
  const { _id } = req.body;

  try {
    const totalOrder = await OrderModel.find();

    const orderHistory = [];

    totalOrder.forEach((item) => {
      if (item.userId === _id) {
        orderHistory.push(item);
      }
    });

    res.status(200).json(orderHistory);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
