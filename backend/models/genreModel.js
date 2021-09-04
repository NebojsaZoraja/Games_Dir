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

export { genreSchema, Genre };