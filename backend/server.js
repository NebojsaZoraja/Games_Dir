import express from 'express';
import path from 'path';
const app = express();
import 'colors';
import { env } from './startup/env.js';
import { routes } from './startup/routes.js';
import { db } from './startup/db.js';


env();
routes(app);
db();



const __dirname = path.resolve();

app.use("/uploads", express.static(path.join(__dirname, '/uploads')));


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')));
}


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`.yellow.bold));
