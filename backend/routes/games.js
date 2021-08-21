const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const { Game, validate } = require('../models/game');
const { Genre } = require('../models/genre');

//GET

router.get('/', async (req, res) => {
    let games = await Game.find().sort('title');
    res.send(games);
});

//GET:ID

router.get('/:id', async (req, res) => {
    const game = await Game.findById(req.params.id);

    if (!game) return res.status(404).send("The game with the given ID was not found.");

    res.send(game);
});

//POST

router.post('/', [auth, admin], async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.message);
    }

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre');

    let game = new Game({
        title: req.body.title,
        publisher: req.body.publisher,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        price: req.body.price,
        tags: req.body.tags,
        totalPurchases: 0,
        image: req.body.image,
        description: req.body.description,
        rating: req.body.rating,
        numberInStock: req.body.numberInStock,
        numReviews: req.body.numReviews
    });

    game = await game.save();
    res.send(game);
});

//PUT

router.put('/:id', async (req, res) => {
    let { error } = validate(req.body);
    if (error) return res.status(400).send(error.message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre');

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

    if (!game) return res.status(404).send("The game with the given ID was not found.");

    res.send(game);
});

//DELETE

router.delete('/:id', async (req, res) => {
    const game = await Game.findByIdAndRemove(req.params.id);

    if (!game) return res.status(404).send("The game with the given ID was not found.");

    res.send(game);
});

module.exports = router;