const Sequelize = require('sequelize');

const sequelize = new Sequelize('public_transport', 'root', 'server22', {
    dialect: 'mysql'
});

module.exports = sequelize;