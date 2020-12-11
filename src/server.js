const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./database');
const experiences = require('./routers/experiences-router');
const users = require('./routers/user-router');

const app = express();
//app.use(cors());
app.use(bodyParser.json());  

//pentru test
app.get('/create', async (req, res, next) => {
    try {
        await sequelize.sync({ force: true});
        res.status(201).json({ message: 'created' })
    } catch (error) {
        next(error);
    }
});

app.use(experiences);
app.use(users);


app.use((err, req, res, next) => {
    console.warn(err);
    res.status(500).json({ message: 'server error' });
})

app.listen(8080);