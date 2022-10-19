const Product = require('../models/Product.model')

module.exports.list = (req, res, next) => {
    Product.find()
     .then(products => {
        res.json(products)
     })
     .catch(next)
}

module.exports.create = (req, res, next) => {
    const { name, price, photo, description } = req.body
    
    Product.create({ name, price, photo, description })
     .then(user => res.status(201).json(user))
     .catch(next)
}

module.exports.currentProduct = (req, res, next) => {
    const { id } = req.params
    
    Product.findById(id)
    .then(products => {
        res.json(products)
     })
     .catch(next)
}

module.exports.delete = (req, res, next) => {
    const { id } = req.params
    
    Product.findByIdAndDelete(id)
     .then(product => res.status(204).json(product))
     .catch(next)
}

module.exports.update = (req, res, next) => {
    const { id } = req.params
    
    Product.findByIdAndUpdate(id, req.body, { new: true })
     .then(product => res.status(202).json(product))
     .catch(next)
}