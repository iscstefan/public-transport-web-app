const Sequelize = require('sequelize');
const sequelize = require('../database');

const Experience = sequelize.define("experience", {
    city: {
        type: Sequelize.STRING,
        allowNull: false
    },
    start: {
        type: Sequelize.STRING
    },
    destination: {
        type: Sequelize.STRING
    },
    transport: {
        type: Sequelize.STRING,
        allowNull: false
    },
    startTime: {
        type: Sequelize.TIME
    },
    duration: {
        type: Sequelize.TIME
    },
    congestion: {
        type: Sequelize.STRING
    },
    observations: {
        type: Sequelize.STRING
    },
    satisfaction: {
        type: Sequelize.INTEGER,
        max: 5,
        min: 1
    }
});

module.exports = Experience;
