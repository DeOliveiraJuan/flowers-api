const router = require('express').Router();
const usersController = require('../controllers/users.controller');
const authController = require('../controllers/auth.controller');

//Users

router.get('/users', usersController.list)
router.post('/users', usersController.create)

//Auth

router.post('/login', authController.login)

module.exports = router;
