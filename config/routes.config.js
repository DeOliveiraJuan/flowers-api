const router = require('express').Router();
const usersController = require('../controllers/users.controller');
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware')
const productsController = require('../controllers/products.controller')
const shippingAddressController = require('../controllers/shippingAddress.controller');
const shoppingCartController = require('../controllers/shoppingCart.controller')

//Users

router.get('/users', usersController.list)
router.post('/users', usersController.create)
router.delete('/users/:id', authMiddleware.isAuthenticated, usersController.delete)
router.get('/users/me', authMiddleware.isAuthenticated, usersController.currentUser)
router.put('/users/:id', authMiddleware.isAuthenticated, usersController.update)

//Shipping Address

router.get('/users/:id/addresses', shippingAddressController.list)
router.post('/users/:id/addresses', shippingAddressController.create)
router.delete('/users/:id/addresses/:id', shippingAddressController.delete)

//Auth

router.post('/login', authController.login)

//Products (FALTA INCLUIR EL AUTH QUE SE ELIMINO PARA PROBAR POSTMAN)

router.get('/products', productsController.list)
router.post('/products', productsController.create)
router.delete('/products/:id', productsController.delete)
router.get('/products/me', productsController.currentProduct)
router.put('/products/:id', productsController.update)

//Shopping cart

router.get('/users/me/cart', shoppingCartController.list)

module.exports = router;
