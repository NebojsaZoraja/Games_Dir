const auth = require('../middleware/auth');
const { User } = require('../models/user');
const Joi = require('joi')
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const admin = require('../middleware/admin');
const router = express.Router();

//GET

router.get('/:id', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
})

//POST

router.post('/register', async (req, res) => {
    let { error } = validate(req.body);
    if (error) return res.status(400).send(error.message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');

    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

router.post('/login', async (req, res) => {
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send(error.message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password.');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send('Invalid email or password.');
    }

    const token = user.generateAuthToken();
    res.json({
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: token
    })
});

//PUT

router.put('/users/:id', auth, async (req, res) => {
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


})



function validateLogin(req) {
    let schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });

    return schema.validate(req);
};

module.exports = router;