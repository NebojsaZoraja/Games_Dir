import mongoose from "mongoose";
import { userSchema } from "./userModel.js";

const orderSchema = mongoose.Schema(
    {
        user: {
            type: userSchema,
            required: true
        },
        orderItem: {
            name: { type: String, required: true },
            image: { type: String, required: true },
            price: { type: String, required: true },
            game: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Game' },
        },
        paymentMethod: {
            type: String,
            required: true
        },
        paymentResult: {
            id: { type: String },
            status: { type: String },
            update_time: { type: String },
            email_address: { type: String }
        },
        totalPrice: {
            type: Number,
            required: true,
            default: 0
        },
    }
)

const Order = mongoose.model('Order', orderSchema);

export { Order };