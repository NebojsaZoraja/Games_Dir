import express from 'express';
import 'colors';
import env from './startup/env.js';
import routes from './startup/routes.js';
import db from './startup/db.js';

const app = express();

env();          //.env setup
db();          // db connection
routes(app);  // api routes

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`.yellow.bold));
