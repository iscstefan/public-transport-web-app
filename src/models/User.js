const Sequelize = require('sequelize');
const sequelize = require('../database');
const Experience = require('./Experience');
const bcrypt = require('bcrypt');
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
            len: [3, 100]
        }
    },
    token: {
        type: Sequelize.STRING
    }
});

User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user.token = null;
});

User.prototype.validPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

User.prototype.validToken = function (token) {
    return this.token === token;
}

User.prototype.hash = async function (password) {
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    return password;
}

User.hasMany(Experience);

module.exports = User;