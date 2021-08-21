const express = require('express');
const genres = require('../routes/genres');
const games = require('../routes/games');
const users = require('../routes/users');
const home = require('../routes/home');
const error = require('../middleware/error');

module.exports = function (app) {
    app.use(express.json());
    app.use('/api/genres', genres);
    app.use('/api/games', games);
    app.use('/api/users', users);
    app.use('/', home);
    app.use(error);
}