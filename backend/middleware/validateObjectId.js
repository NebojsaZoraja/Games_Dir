import mongoose from 'mongoose';

const validateObjectId = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(404);
        throw new Error("Invalid ID.");
    }
    next();
}

export { validateObjectId };