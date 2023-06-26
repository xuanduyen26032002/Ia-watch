import { VoucherModel } from "../models/VoucherModel.js";

export const getVouchers = async (req, res) => {
  try {
    const vouchers = await VoucherModel.find();
    res.status(200).json(vouchers);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getVoucher = async (req, res) => {
  try {
    const voucher = await VoucherModel.findOne({ _id: req.body._id });
    res.status(200).json(voucher);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const createVoucher = async (req, res) => {
  const { voucherName, description, saleOff } = req.body;
  //check sale off
  if (Number(saleOff) < 1 || Number(saleOff) > 100)
    return res
      .status(400)
      .json({ success: false, message: "Phần trăm giảm phải từ 1 - 100 !" });

  if (!voucherName || !description || !saleOff) {
    return res
      .status(400)
      .json({ success: false, message: "Vui lòng nhập đầy đủ thông tin !" });
  }

  //check vouchername
  const voucherNameChecked = await VoucherModel.findOne({ voucherName });
  if (voucherNameChecked)
    return res
      .status(400)
      .json({ success: false, message: "Tên Voucher đã bị trùng !" });

  try {
    const newVoucher = req.body;

    const voucher = new VoucherModel(newVoucher);
    await voucher.save();

    res.status(200).json(voucher);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const updateVoucher = async (req, res) => {
  const { voucherName, description, saleOff } = req.body;

  //check saleoff
  // if (Number(saleOff) < 1 || Number(saleOff) > 100)
  //   return res
  //     .status(400)
  //     .json({ success: false, message: "Phần trăm giảm phải từ 1 - 100 !" });

  // if (!voucherName || !description) {
  //   return res
  //     .status(400)
  //     .json({ success: false, message: "Vui lòng nhập đầy đủ thông tin !" });
  // }

  //check vouchername
  const voucherNameChecked = await VoucherModel.findOne({ voucherName });
  if (voucherNameChecked && voucherNameChecked.voucherName !== voucherName)
    return res
      .status(400)
      .json({ success: false, message: "Tên Voucher đã bị trùng !" });

  try {
    const updateVoucher = req.body;

    const voucher = await VoucherModel.findByIdAndUpdate(
      { _id: req.params._id },
      updateVoucher
    );

    res.status(200).json(voucher);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const deleteVoucher = async (req, res) => {
  try {
    await VoucherModel.findByIdAndDelete(req.params._id);

    res.status(200).json("Voucher has been deleted !");
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};
