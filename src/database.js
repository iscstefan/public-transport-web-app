const Sequelize = require('sequelize');

const sequelize = new Sequelize('public_transport', 'root', 'dba', {
    dialect: 'mysql'
});

module.exports = sequelize;