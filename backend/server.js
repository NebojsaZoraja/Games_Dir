import express from 'express';
const app = express();
import 'colors';
import { env } from './startup/env.js';
import { routes } from './startup/routes.js';
import { db } from './startup/db.js';

env();
db();
routes(app);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`.yellow.bold));
