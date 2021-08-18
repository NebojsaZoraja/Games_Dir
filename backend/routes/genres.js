const { Genre, validate } = require('../models/genre');
const express = require('express');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');
const admin = require('../middleware/admin');
const validateObjectId = require('../middleware/validateObjectId')
const router = express.Router();


//GET

router.get('/', async (req, res, next) => {
    let genres = await Genre.find().sort('name');
    res.header("Access-Control-Allow-Origin", "*")
    res.send(genres);
});

//GET:ID

router.get('/:id', validateObjectId, async (req, res) => {
    const genre = await Genre.findById(req.params.id);

    if (!genre) return res.status(404).send("The genre with the given ID was not found.");

    res.send(genre);
});

//POST

router.post('/', auth, async (req, res) => {


    let { error } = validate(req.body);
    if (error) return res.status(400).send(error.message);

    let genre = new Genre({ name: req.body.name });
    genre = await genre.save();

    res.send(genre);
});

//PUT

router.put('/:id', [auth, validateObjectId], async (req, res) => {
    let { error } = validate(req.body);
    if (error) return res.status(400).send(error.message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
        new: true
    });

    if (!genre) return res.status(404).send("The genre with the given ID was not found.");

    res.send(genre);
});

//DELETE

router.delete('/:id', [auth, admin, validateObjectId], async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);

    if (!genre) return res.status(404).send("The genre with the given ID was not found.");

    res.send(genre);
});

module.exports = router;