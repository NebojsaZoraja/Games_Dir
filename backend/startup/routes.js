import express from 'express';
import { router as genres } from '../routes/genres.js';
import { router as games } from '../routes/games.js';
import { router as users } from '../routes/users.js';
import { errorHandler, notFound } from '../middleware/error.js';


const routes = (app) => {
    app.use(express.json());
    app.use('/api/genres', genres);
    app.use('/api/games', games);
    app.use('/api/users', users);
    app.use(notFound);
    app.use(errorHandler);
}

export { routes };