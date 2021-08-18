const Joi = require('joi');
const mongoose = require('mongoose');

const genreSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    }
});

const Genre = mongoose.model('Genre', genreSchema);

function validateGenre(genre) {
    let schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(genre);
};

exports.Genre = Genre;
exports.genreSchema = genreSchema;
exports.validate = validateGenre;