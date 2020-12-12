const Experience = require('../../models/Experience');
const User = require('../../models/User');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const addExperience = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.uid);

        if (user) {
            const experience = await Experience.create(req.body);
            experience.userId = user.id;
            await experience.save();
            res.status(201).json({ message: "created" });
        }
        else {
            res.status(404).json({ message: "not found" });
        }

    } catch (err) {
        if (err.name === 'SequelizeValidationError') {
            res.status(422).json({ message: 'incorrect input' });
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
        res.status(201).json({ message: 'created' });
    } catch (err) {
        next(err);
    }
}

const updateUser = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.uid);
        if (user) {
            await user.update(req.body);
            res.status(200).json({ message: 'accepted' });
        } else {
            res.status(404).json({ message: 'not found' });
        }
    } catch (err) {
        next(err);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.uid);
        if (user) {
            await user.destroy(req.body);
            res.status(200).json({ message: 'accepted' });
        } else {
            res.status(404).json({ message: 'not found' });
        }
    } catch (err) {
        next(err);
    }
}

const getExperiences = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.uid, {
            include: [Experience]
        });
        if (user) {
            res.status(200).json(user.experiences);
        } else {
            res.status(404).json({ message: 'not found' });
        }
    } catch (err) {
        next(err);
    }
}

const deleteExperience = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.uid);

        if (user) {
            const experiences = await user.getExperiences({
                where: {
                    id: req.params.eid
                }
            });

            const experience = experiences.shift();
            
            if (experience) {
                await experience.destroy();
                res.status(200).json({ message: 'accepted' });
            } else {
                res.status(404).json({ message: 'not found' });
            }
        } else {
            res.status(404).json({ message: 'not found' });
        }
    } catch (err) {
        next(err);
    }
}

const updateExperience = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.uid);

        if (user) {
            const experiences = await user.getExperiences({
                where: {
                    id: req.params.eid
                }
            });
            
            const experience = experiences.shift();

            if (experience) {
                await experience.update(req.body);
                res.status(200).json({ message: 'accepted' });
            } else {
                res.status(404).json({ message: 'not found' });
            }
        } else {
            res.status(404).json({ message: 'not found' });
        }
    } catch (err) {
        next(err);
    }
}

module.exports = {
    addExperience,
    getUsers,
    addUser,
    updateUser,
    deleteUser,
    getExperiences,
    deleteExperience,
    updateExperience
}