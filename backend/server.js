import express from 'express';
const app = express();
import 'colors';
import { routes } from './startup/routes.js';
import { env } from './startup/env.js';
import { db } from './startup/db.js';
import { prod } from './startup/prod.js'

env();
db();
routes(app);
prod(app);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`.yellow.bold));
