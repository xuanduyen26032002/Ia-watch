import express from 'express';
import { getVouchers, createVoucher, updateVoucher, deleteVoucher, getVoucher } from '../controllers/vouchers.js';

const router = express.Router();
//http://localhost:5000/vouchers

router.get('/', getVouchers);

router.post('/detail', getVoucher);

router.post('/', createVoucher);

router.post('/update/:_id', updateVoucher);

router.delete("/delete/:_id", deleteVoucher);


export default router;
