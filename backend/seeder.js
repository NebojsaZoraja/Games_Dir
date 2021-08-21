const { Genre } = require("./models/genre")
const winston = require('winston');
const genres = require("./data/genres")
const mongoose = require("mongoose");
const config = require("config");

const db = config.get('db');
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then(() => console.log('Connected to MongoDB...'));

const importData = async () => {
    try {
        await Genre.insertMany(genres)
        console.log("hello")
        process.exit();
    }
    catch (error) {
        console.error(`${error} this was the error`)
    }
}

importData();