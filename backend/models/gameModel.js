import Joi from 'joi';
import mongoose from 'mongoose';
import { genreSchema } from './genreModel.js';

const reviewSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
        user: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'User'
        },
    },
    {
        timestamps: true
    }
)

const gameSchema = mongoose.Schema({

    title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255
    },
    publisher: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255
    },
    genre: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Genre'
    },
    price: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    image: {
        type: String,
        required: true
    },
    reviews: [reviewSchema],
    description: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        default: 0,
    },
    numberInStock: {
        type: Number,
        min: 0,
        max: 100,
        required: true,
        default: 0
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0
    },
    minRequirements: {
        type: String,
        required: true
    },
    recRequirements: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Game = new mongoose.model('Game', gameSchema);

export { Game, gameSchema };
