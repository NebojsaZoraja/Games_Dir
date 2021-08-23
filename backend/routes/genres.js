import { Genre, validateGenre } from '../models/genreModel.js'
import express from 'express';
import admin from '../middleware/admin.js'
import { auth } from '../middleware/auth.js';
import asyncHandler from 'express-async-handler';
import { validateObjectId } from '../middleware/validateObjectId.js';

const router = express.Router();

//GET

router.get('/', asyncHandler(async (req, res, next) => {
    let genres = await Genre.find().sort('name');
    res.json(genres);
}));

//GET:ID

router.get('/:id', validateObjectId, asyncHandler(async (req, res) => {
    const genre = await Genre.findById(req.params.id);

    if (!genre) {
        res.status(404);
        throw new Error("The genre with the given ID was not found.");
    }

    res.json(genre);
}));

//POST

router.post('/', auth, asyncHandler(async (req, res) => {
    let { error } = validateGenre(req.body);
    if (error) {
        res.status(400);
        throw new Error(error.message);
    }

    let genre = new Genre({ name: req.body.name });
    genre = await genre.save();

    res.json(genre);
}));

//PUT

router.put('/:id', [auth, validateObjectId], asyncHandler(async (req, res) => {
    let { error } = validateGenre(req.body);
    if (error) {
        res.status(400);
        throw new Error(error.message);
    }

    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
        new: true
    });

    if (!genre) {
        res.status(404);
        throw new Error("The genre with the given ID was not found.");
    }

    res.json(genre);
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