import { Genre } from '../models/genreModel.js'
import { Game } from '../models/gameModel.js';
import express from 'express';
import { auth, admin } from '../middleware/auth.js';
import asyncHandler from 'express-async-handler';
import { validateObjectId } from '../middleware/validateObjectId.js';

const router = express.Router();

//GET ALL GENRES

router.get('/', asyncHandler(async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.json(genres);
}));

//GET GENRE BY ID

router.get('/:id', [auth, admin], asyncHandler(async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (genre) {
        res.status(201);
        res.json(genre);
    } else {
        res.status(404);
        throw new Error("Genre not found");
    }
}))

//POST NEW GENRE

router.post('/', [auth, admin], asyncHandler(async (req, res) => {
    let genre = new Genre({ name: "Sample Genre" });
    genre = await genre.save();
    res.status(201);

    res.json(genre);
}));

//PUT UPDATE GENRE

router.put('/:id', [auth, validateObjectId], asyncHandler(async (req, res) => {

    const genre = await Genre.findById(req.params.id);


    if (!genre) {
        res.status(404);
        throw new Error("The genre with the given ID was not found.");
    } else {
        genre.name = req.body.name;
    }

    const updatedGenre = await genre.save();
    res.json(updatedGenre);
}));

//DELETE GENRE

router.delete('/:id', [auth, admin, validateObjectId], asyncHandler(async (req, res) => {
    const game = await Game.find({ genre: req.params.id });
    if (game.length === 0) {
        const genre = await Genre.findByIdAndRemove(req.params.id);
        res.json(genre);
        if (!genre) {
            res.status(404);
            throw new Error("The genre with the given ID was not found.");
        }
    } else {
        res.status(400);
        throw new Error("There are games associated with this genre");
    }
}));

export { router };