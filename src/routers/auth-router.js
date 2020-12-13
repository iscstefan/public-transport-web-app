const express = require('express');
const authRouter = express.Router();
const crypto = require('crypto');
const User = require('../models/User');

authRouter.post('/login', async (req, res, next) => {
    try {
        const credentials = req.body;
        const username = credentials.username;
        const password = credentials.password;

        if(!username && !password)
            res.status(401).json({message: 'invalid credentials'});

        const user = await User.findOne({ where: { username: username } });

        if(user && await user.validPassword(password)) {
            const token = crypto.randomBytes(64).toString('hex');
            user.token = token;
            await user.save();
            res.status(200).json({token: token});
        }
        else {
            res.status(401).json({message: 'invalid credentials'});
        }
    } catch (err) {
        next(err);
    }
});

module.exports = authRouter;