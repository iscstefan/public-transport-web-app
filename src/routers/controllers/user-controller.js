const Experience = require('../../models/Experience');
const User = require('../../models/User');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const addExperience = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.uid);

        if(user) {
            const experience = await Experience.create(req.body);
            experience.userId = user.id;
            await experience.save();
            res.status(201).json({message: "created"});

        }
        else {
            res.status(404).json({message: "not found" });
        }

    } catch (err) {
        if(err.name === 'SequelizeValidationError') {
            res.status(422).json({message: 'incorrect input'});
        }
        else {
            next(err);
        }
    }
}

const getUsers = async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
}

//de tratat cazul in care se arunca exceptie notunique
const addUser = async (req, res, next) => {
    try {
        await User.create(req.body);
        res.status(201).json({message: 'created'});
    } catch (err) {
        next(err);
    }
}

module.exports = {
    addExperience,
    getUsers,
    addUser
}