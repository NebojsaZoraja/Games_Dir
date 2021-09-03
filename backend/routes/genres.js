import { Genre, validateGenre } from '../models/genreModel.js'
import express from 'express';
import admin from '../middleware/admin.js'
import { auth } from '../middleware/auth.js';
import asyncHandler from 'express-async-handler';
import { validateObjectId } from '../middleware/validateObjectId.js';

const router = express.Router();

//GET

router.get('/', asyncHandler(async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.json(genres);
}));

router.get('/:id', [auth, admin], asyncHandler(async (req, res) => {
    const genre = await Genre.findById(req.params.id)
    if (genre) {
        res.status(201);
        res.json(genre);
    } else {
        res.status(404);
        throw new Error("Genre not found");
    }
}))

//POST

router.post('/', [auth, admin], asyncHandler(async (req, res) => {
    let genre = new Genre({ name: "Sample Genre" });
    genre = await genre.save();
    res.status(201);

    res.json(genre);
}));

//PUT

router.put('/:id', [auth, validateObjectId], asyncHandler(async (req, res) => {

    const genre = await Genre.findById(req.params.id)

    if (genre) {
        genre.name = req.body.name
    }
    const updatedGenre = await genre.save();

    if (!genre) {
        res.status(404);
        throw new Error("The genre with the given ID was not found.");
    }

    res.json(updatedGenre);
}));

//DELETE

router.delete('/:id', [auth, admin, validateObjectId], asyncHandler(async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);

    if (!genre) {
        res.status(404);
        throw new Error("The genre with the given ID was not found.");
    }

    res.json(genre);
}));

export { router };