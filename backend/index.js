const express = require('express');
const winston = require('winston');
const app = express();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/logging')();
require('./startup/config')()
require('./startup/prod')(app);
require('./startup/env')();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});


app.listen(process.env.PORT || 5000, () => winston.info(`Listening on port ${process.env.PORT}`));
