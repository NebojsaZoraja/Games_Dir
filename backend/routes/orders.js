import express from 'express';
import asyncHandler from 'express-async-handler';
import { Order } from '../models/orderModel.js';
import { auth } from '../middleware/auth.js'

const router = express.Router();

//Create order POST

router.post('/', auth, asyncHandler(async (req, res) => {
    const { orderItem, paymentMethod, totalPrice, } = req.body;

    if (!orderItem) {
        res.status(400);
        throw new Error('No order item');
    } else {
        const order = new Order({
            user: req.user._id,
            orderItem, paymentMethod, totalPrice,
        })
    }
    const createdOrder = order.save();
    res.status(201).json(createdOrder);
}))

export { router };