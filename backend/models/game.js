const { string } = require('joi');
const Joi = require('joi');
const mongoose = require('mongoose');
const { genreSchema } = require('./genre');

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
    totalPurchases: {
        type: Number,
        min: 0
    },
});

const Game = new mongoose.model('Game', gameSchema);

function validateGame(game) {
    let schema = Joi.object({
        title: Joi.string().min(1).max(255).required(),
        publisher: Joi.string().min(1).max(255).required(),
        genreId: Joi.string().required(),
        price: Joi.number().min(0).max(255).required(),
        tags: Joi.array().min(1).max(255).required(),
        totalPurchases: Joi.number().min(0),
    });

    return schema.validate(game);
};

exports.Game = Game;
exports.gameSchema = genreSchema;
exports.validate = validateGame;