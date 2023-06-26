import express from 'express';
import { getOrders, createOrder, confirmOrder, deleteOrder, getOrder, getOrderHistory } from '../controllers/orders.js';

const router = express.Router();
//http://localhost:5000/orders

router.get("/", getOrders);

router.post("/", createOrder);

router.post('/confirmorder', confirmOrder);

router.delete('/delete/:_id', deleteOrder);

//chi tiet order
router.get('/detail', getOrder);
router.post('/history', getOrderHistory)

export default router;
