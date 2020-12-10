const Sequelize = require('sequelize');
const sequelize = require('../database');
const Experience = require('./Experience');
//User model still in progress

const User = sequelize.define('user', {
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [3, 25]
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [3,100]
        }
    }
});

User.hasMany(Experience);

module.exports = User;