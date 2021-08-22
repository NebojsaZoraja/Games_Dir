import Joi from 'joi';
import mongoose from 'mongoose';
import { genreSchema } from './genre.js';

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
        type: genreSchema,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    tags: {
        type: Array,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    totalPurchases: {
        type: Number,
        min: 0,
        default: 0
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        required: true,
        default: 0
    },
    description: {
        type: String,
        required: true,
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
    }
});

const Game = new mongoose.model('Game', gameSchema);

const validateGame = (game) => {
    let schema = Joi.object({
        title: Joi.string().min(1).max(255).required(),
        publisher: Joi.string().min(1).max(255).required(),
        genreId: Joi.string().required(),
        price: Joi.number().min(0).max(255).required(),
        tags: Joi.array().min(1).max(255).required(),
        image: Joi.string().required(),
        totalPurchases: Joi.number().min(0),
        rating: Joi.number().min(0).max(5),
        description: Joi.string().required(),
        numberInStock: Joi.number().min(0).max(100),
        numReviews: Joi.number()
    });

    return schema.validate(game);
};

export { Game, validateGame };
