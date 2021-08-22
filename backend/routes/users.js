import express from 'express';
import auth from '../middleware/auth.js';
import { User, validateUser } from '../models/user.js';
import Joi from 'joi';
import bcrypt from 'bcrypt';
import _ from 'lodash'
import asyncHandler from 'express-async-handler';
import { validateObjectId } from '../middleware/validateObjectId.js';

const router = express.Router();

//GET

router.get('/profile', [auth], asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
}));

//POST

router.post('/register', asyncHandler(async (req, res) => {
    let { error } = validateUser(req.body);
    if (error) {
        res.status(400);
        throw new Error(error.message);
    }

    let user = await User.findOne({ email: req.body.email });
    if (user) {
        res.status(400);
        throw new Error('User already registered.');
    }

    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).json(_.pick(user, ['_id', 'name', 'email']));
}));

router.post('/login', asyncHandler(async (req, res) => {
    const { error } = validateLogin(req.body);
    if (error) {
        res.status(400);
        throw new Error(error.message);
    }

    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        res.status(400);
        throw new Error('Invalid email or password.');
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        res.status(400);
        throw new Error('Invalid email or password.');
    }

    const token = user.generateAuthToken();
    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: token
    })
}));

//PUT

router.put('/:id', [auth, validateObjectId], asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save();
        const token = updatedUser.generateAuthToken();

        res.json({
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: token
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }


}));

function validateLogin(req) {
    let schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });

    return schema.validate(req);
};

export { router };