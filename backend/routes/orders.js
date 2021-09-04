import express from 'express';
import asyncHandler from 'express-async-handler';
import { Order } from '../models/orderModel.js';
import { auth } from '../middleware/auth.js'
import { generate } from '../middleware/generator.js';
import { Game } from '../models/gameModel.js';

const router = express.Router();


//GET USER ORDERS

router.get('/myorders', auth, asyncHandler(async (req, res) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;

    const count = await Order.find({ user: req.user._id }).countDocuments();

    const orders = await Order.find({ user: req.user._id }).limit(pageSize).skip(pageSize * (page - 1));
    res.json({ orders, page, pages: Math.ceil(count / pageSize) });
}))


//GET ORDER BY ID

router.get('/:id', auth, asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error("Order not found");
    }

}));



//POST CREATE ORDER

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
        })
    }
    order.save();
    res.status(201);
    res.json(order);
}))

router.put('/:id/pay', auth, asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    const game = await Game.findById(order.orderItem.game);
    if (order) {

        order.isPaid = true,
            order.productKey = generate(),
            order.paymentResult = {         //Paypal api
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_addres: req.body.payer.email_addres
            }
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
    if (game) {
        game.numberInStock = game.numberInStock - 1;
    }
    await game.save();
    await order.save();

    res.json(order);

}))


export { router };