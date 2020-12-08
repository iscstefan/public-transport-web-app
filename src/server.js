const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const sequelize = require('./database');
const User = require('./models/User');
const Experience = require('./models/Experience')

const app = express();

//pentru test
app.get('/create', async (req, res, next) => {
    try {
        await sequelize.sync({ force: true });
        res.status(201).json({ message: 'created' })
    } catch (error) {
        next(error);
    }
});

app.listen(8080);