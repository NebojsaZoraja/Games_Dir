import express from 'express';
import admin from '../middleware/admin.js'
import auth from '../middleware/auth.js';
import { Game, validateGame } from '../models/game.js';
import { Genre } from '../models/genre.js';
import asyncHandler from 'express-async-handler';
import { validateObjectId } from '../middleware/validateObjectId.js';

const router = express.Router();

//GET

router.get('/', asyncHandler(async (req, res) => {
    let games = await Game.find().sort('title');
    res.json(games);
}));

//GET:ID

router.get('/:id', validateObjectId, asyncHandler(async (req, res) => {
    const game = await Game.findById(req.params.id);

    if (game) {
        res.json(game);
    }
    else {
        res.status(404);
        throw new Error('Product not found');
    }
}));

//POST

router.post('/', [auth, admin], asyncHandler(async (req, res) => {
    const { error } = validateGame(req.body);
    if (error) {
        res.status(400);
        throw new Error(error.message);
    }

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) {
        res.status(400);
        throw new Error('Invalid genre');
    };

    let game = new Game({
        title: req.body.title,
        publisher: req.body.publisher,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        price: req.body.price,
        tags: req.body.tags,
        image: req.body.image,
        description: req.body.description,
        rating: req.body.rating,
        numberInStock: req.body.numberInStock,
        numReviews: req.body.numReviews
    });

    game = await game.save();
    res.json(game);
}));

//PUT

router.put('/:id', validateObjectId, asyncHandler(async (req, res) => {
    let { error } = validateGame(req.body);
    if (error) {
        res.status(400);
        throw new Error(error.message);
    }

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) {
        res.status(400);
        throw new Error('Invalid genre');
    }

    const game = await Game.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        publisher: req.body.publisher,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        tags: req.body.tags,
        totalPurchases: req.body.totalPurchases
    },
        { new: true });

    if (!game) {
        res.status(404);
        throw new Error("The game with the given ID was not found.");
    }

    res.json(game);
}));

//DELETE

router.delete('/:id', validateObjectId, asyncHandler(async (req, res) => {
    const game = await Game.findByIdAndRemove(req.params.id);

    if (!game) {
        res.status(404);
        throw new Error("The game with the given ID was not found.");
    }

    res.json(game);
}));

export { router };