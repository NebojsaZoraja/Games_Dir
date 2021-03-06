import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        orderItem: {
            title: { type: String, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            game: { type: mongoose.Types.ObjectId, required: true, ref: 'Game' },
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
        isPaid: {
            type: Boolean,
            required: true,
            default: false
        },
        productKey: {
            type: String,
            required: true,
            default: " "
        }
    },
    {
        timestamps: true
    }
)

const Order = mongoose.model('Order', orderSchema);

export { Order };