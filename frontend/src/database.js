const Sequelize = require('sequelize');

const sequelize = new Sequelize('public_transport', 'root', 'hellodb', {
    dialect: 'mysql'
});

module.exports = sequelize;