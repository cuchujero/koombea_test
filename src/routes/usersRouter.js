const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');
const {userFieldsValidator} = require('../helpers/validationsFields');
const {generalValidation} = require('../middlewares/validationsMw');
const {requestAuthorization} = require('../middlewares/authorizationsMw');


router.get('/:id?', usersController.getUsers);
router.post('/',  userFieldsValidator, generalValidation, usersController.createUser);
router.post('/login', userFieldsValidator, generalValidation, usersController.loginUser);
router.post('/recoverPassword', usersController.recoverPasswordUser);
router.put('/', usersController.updateUser);
router.delete('/', usersController.deleteUser);

module.exports = router;