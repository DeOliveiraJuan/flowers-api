const ShippingAddress = require('../models/ShippingAddress.model')

module.exports.list = (req, res, next) => {
    ShippingAddress.find()
     .then(shippingAddress => {
        res.json(shippingAddress)
     })
     .catch(next)
}

module.exports.create = (req, res, next) => {
    const { user, street, streetNumber, floor, city, zipCode } = req.body
    
    ShippingAddress.create({ user, street, streetNumber, floor, city, zipCode })
     .then(shippingAddress => res.status(201).json(shippingAddress))
     .catch(next)
}

module.exports.delete = (req, res, next) => {
    const { id } = req.params
    
    ShippingAddress.findByIdAndDelete(id)
     .then(shippingAddress => res.status(204).json(shippingAddress))
     .catch(next)
}
