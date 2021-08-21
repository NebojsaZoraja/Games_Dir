const express = require('express');
const winston = require('winston');
const app = express();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/logging')();
require('./startup/prod')(app);
require('./startup/env')();


app.listen(process.env.PORT || 5000, () => winston.info(`Listening on port ${process.env.PORT}`));
