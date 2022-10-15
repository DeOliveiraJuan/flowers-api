const router = require('express').Router();
const usersController = require('../controllers/users.controller');
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware')

//Users

router.get('/users', usersController.list)
router.post('/users', usersController.create)
router.delete('/users/:id', authMiddleware.isAuthenticated, usersController.delete)
router.get('/users/:id', authMiddleware.isAuthenticated, usersController.currentUser)
router.put('/users/:id', authMiddleware.isAuthenticated, usersController.update)

//Auth

router.post('/login', authController.login)

module.exports = router;
