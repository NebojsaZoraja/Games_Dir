import express from 'express';
import asyncHandler from 'express-async-handler';
import { Order } from '../models/orderModel.js';
import { auth } from '../middleware/auth.js'
import { generate } from '../middleware/generator.js';

const router = express.Router();

//GET order

router.get('/:id', auth, asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order) {
        res.json(order)
    } else {
        res.status(404);
        throw new Error("Order not found");
    }

}));

//Create order POST

router.post('/', auth, asyncHandler(async (req, res) => {
    const { orderItem, paymentMethod, totalPrice, } = req.body;
    let order;
    if (!orderItem) {
        res.status(400);
        throw new Error('No order item');
    } else {
        order = new Order({
            user: req.user._id,
            orderItem, paymentMethod, totalPrice,
            productKey: generate(),
        })
    }
    order.save();
    res.status(201)
    res.json(order);
}))

router.put('/:id/pay', auth, asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.isPaid = true,
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_addres: req.body.payer.email_addres
            }
    } else {
        res.status(404);
        throw new Error('Order not found');
    }

    const updatedOrder = await order.save();

    res.json(updatedOrder);

}))


export { router };