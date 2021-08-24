import Joi from 'joi';
import mongoose from 'mongoose';

const genreSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    }
}, {
    timestamps: true
});

const Genre = mongoose.model('Genre', genreSchema);

const validateGenre = (genre) => {
    let schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(genre);
};

export { genreSchema, Genre, validateGenre };