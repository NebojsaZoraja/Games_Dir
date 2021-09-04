import express from 'express';
import admin from '../middleware/admin.js'
import { auth } from '../middleware/auth.js';
import { Game } from '../models/gameModel.js';
import asyncHandler from 'express-async-handler';
import { validateObjectId } from '../middleware/validateObjectId.js';

const router = express.Router();

//GET ALL GAMES + SEARCH

router.get('/', asyncHandler(async (req, res) => {

    const keyword = req.query.keyword ? {
        title: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

    const games = await Game.find({ ...keyword }).populate('genre', ' name ');

    res.json(games);
}));

//GET LIMITED NUMBER OF GAMES FOR HOMEPAGE

router.get('/homepage', asyncHandler(async (req, res) => {
    const games = await Game.find({}).populate('genre', ' name ').limit(25);

    res.json(games);
}));

//GET GAMES FOR ADMIN GAME LIST, PAGINATION

router.get('/paginate', asyncHandler(async (req, res) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;

    const count = await Game.countDocuments();

    const games = await Game.find({}).populate('genre', ' name ').limit(pageSize).skip(pageSize * (page - 1));
    res.json({ games, page, pages: Math.ceil(count / pageSize) });
}));

//GET GAME BY ID

router.get('/:id', validateObjectId, asyncHandler(async (req, res) => {
    const game = await Game.findById(req.params.id).populate('genre', ' name ');

    if (game) {
        res.json(game);
    }
    else {
        res.status(404);
        throw new Error('Game not found');
    }
}));

//POST NEW GAME

router.post('/', [auth, admin], asyncHandler(async (req, res) => {
    let game = new Game({
        title: 'Sample title',
        publisher: "Sample publisher",
        genre: "6127b40949f80e08b4eead36",
        price: 0,
        image: "/images/sample.jpg",
        description: "Sample desc",
        numberInStock: 0,
        numReviews: 0,
        minRequirements: "sample minRequirements",
        recRequirements: "sample recRequirements",
    });

    const createdGame = await game.save();
    res.status(201).json(createdGame);
}));

//POST REVIEW

router.post('/:id/reviews', [auth, validateObjectId], asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;

    const game = await Game.findById(req.params.id).populate('genre', ' name ');

    if (game) {
        const alreadyReviewed = game.reviews.find((r) => r.user.toString() === req.user._id.toString());

        if (alreadyReviewed) {
            res.status(400);
            throw new Error('Product already reviewed');
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        };

        game.reviews.push(review);
        game.numReviews = game.reviews.length;

        game.rating = game.reviews.reduce((acc, item) => item.rating + acc, 0) / game.reviews.length;

        await game.save();
        res.status(201).json({ message: "Review added" });
    }

}))

//PUT UPDATE GAME

router.put('/:id', [validateObjectId, auth, admin], asyncHandler(async (req, res) => {

    const { title, publisher, genre, price, image, description, numberInStock, minRequirements, recRequirements } = req.body;

    const game = await Game.findById(req.params.id).populate('genre', ' name ');

    if (game) {
        game.title = title;
        game.publisher = publisher;
        game.genre = genre;
        game.price = price;
        game.image = image;
        game.description = description;
        game.numberInStock = numberInStock;
        game.minRequirements = minRequirements;
        game.recRequirements = recRequirements;

        const updatedGame = await game.save();
        res.json(updatedGame);
    } else {
        res.status(404);
        throw new Error('Game not found');
    }

}));

//DELETE GAME

router.delete('/:id', [auth, admin], asyncHandler(async (req, res) => {
    const game = await Game.findByIdAndRemove(req.params.id);

    if (!game) {
        res.status(404);
        throw new Error("The game with the given ID was not found.");
    } else {
        await game.remove();
        res.json({ message: 'Game removed' });
    }
}));

export { router };