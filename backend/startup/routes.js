import express from 'express';
import { router as genres } from '../routes/genres.js';
import { router as games } from '../routes/games.js';
import { router as users } from '../routes/users.js';
import { router as orders } from '../routes/orders.js';
import { router as uploads } from '../routes/uploads.js';
import { errorHandler, notFound } from '../middleware/error.js';


const routes = (app) => {
    app.use(express.json());
    app.use('/api/genres', genres);
    app.use('/api/games', games);
    app.use('/api/users', users);
    app.use('/api/orders', orders);
    app.use('/api/uploads', uploads);
    app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))
    app.use(notFound);
    app.use(errorHandler);
}

export { routes };