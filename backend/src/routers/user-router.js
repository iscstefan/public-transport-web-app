const express = require('express');
const userController = require('./controllers/user-controller');
const router = express.Router();



//utilizatori
router.get('/users', userController.getUsers);

router.post('/users', userController.addUser);


//control access utilizatori
router.use('/users/:uid', userController.grantAccess);


router.put('/users/:uid', userController.updateUser);

router.delete('/users/:uid', userController.deleteUser);


//experientele utilizatorilor
router.get('/users/:uid/experiences', userController.getExperiences);

router.post('/users/:uid/experiences', userController.addExperience);

router.delete('/users/:uid/experiences/:eid', userController.deleteExperience);

router.put('/users/:uid/experiences/:eid', userController.updateExperience);

module.exports = router;