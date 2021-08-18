const { addColors } = require('winston');
const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function () {
    winston.exceptions.handle(new winston.transports.Console({ format: winston.format.simple() }), new winston.transports.File({ filename: 'unhandledExceptions.log' }))
    winston.add(new winston.transports.Console({ format: winston.format.combine(winston.format.colorize(), winston.format.simple()) }));

    process.on('unhandledRejection', (ex) => {
        throw ex;
    })

    winston.add(new winston.transports.File({ filename: 'logfile.log' }));
    // winston.add(new winston.transports.MongoDB({ db: 'mongodb://localhost/gamesdirdb', options: { useUnifiedTopology: true }, level: 'error' }))
}