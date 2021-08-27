import { Genre } from './models/genreModel.js'
import { Game } from './models/gameModel.js';
import genres from "./data/genres.js"
import games from './data/games.js';
import mongoose from 'mongoose';


mongoose.connect("mongodb://localhost:27017/gamesdirdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then(() => console.log('Connected to MongoDB...'));

const importData = async () => {
    try {
        await Game.insertMany(games)
        console.log("hello")
        process.exit();
    }
    catch (error) {
        console.error(`${error} this was the error`)
    }
}

importData();