import express from 'express';
import path from 'node:path';
const app = express();
import 'colors';
import { env } from './startup/env.js';
import { routes } from './startup/routes.js';
import { db } from './startup/db.js';
import { prod } from './startup/prod.js'
import morgan from 'morgan';

const __dirname = path.resolve();



app.use("/uploads", express.static(path.join(__dirname, '/uploads')));
env();
routes(app);
db();
prod(app);
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`.yellow.bold));
