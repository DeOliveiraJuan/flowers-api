const ShoppingCart = require('../models/ShoppingCart.model')

module.exports.list = (req, res, next) => {
    Product.find()
     .then(products => {
        res.json(products)
     })
     .catch(next)
}

//Pendiente de configurar para que solo se pueda crear un carrito y nada más