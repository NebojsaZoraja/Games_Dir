import express from 'express';
import { auth } from '../middleware/auth.js';
import User from '../models/userModel.js';
import { validateUser } from '../models/userModel.js';
import Joi from 'joi';
import bcrypt from 'bcrypt';
import _ from 'lodash'
import asyncHandler from 'express-async-handler';

const router = express.Router();

//GET

router.get('/profile', auth, asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404);
        throw new Error('User not found');
    }
}));

//POST

router.post('/', asyncHandler(async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) {
        res.status(400);
        throw new Error(error.message);
    }

    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists.');
    }

    const user = new User(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = user.generateAuthToken();
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: token
        });
    }
    else {
        res.status(400);
        throw new Error("Invalid user data");
    }
}));

router.post('/login', asyncHandler(async (req, res) => {
    const { error } = validateLogin(req.body);
    if (error) {
        res.status(400);
        throw new Error(error.message);
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        res.status(400);
        throw new Error('Invalid email or password.');
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword) {
        res.status(400);
        throw new Error('Invalid email or password.');
    }

    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: user.generateAuthToken()
    })
}));

//PUT

router.put('/profile', auth, asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    const salt = await bcrypt.genSalt(10);
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password) {
            user.password = req.body.password;
            user.password = await bcrypt.hash(user.password, salt);
        }
        const updatedUser = await user.save();

        res.json({
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: updatedUser.generateAuthToken()
        });
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