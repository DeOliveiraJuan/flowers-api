const Product = require('../models/Product.model')

module.exports.list = (req, res, next) => {
    Product.find()
     .then(products => {
        res.json(products)
     })
     .catch(next)
}

module.exports.listPlants = (req, res, next) => {
    Product.find({ isPlant: true })
     .then(products => {
        res.json(products)
     })
     .catch(next)
}

module.exports.listFlowers = (req, res, next) => {
    Product.find({ isPlant: false })
     .then(products => {
        res.json(products)
     })
     .catch(next)
}

module.exports.create = (req, res, next) => {

    console.log(req.body);

    if (req.files) {
        console.log(req.files);

        req.body.images = null
        // aqui las meteremos en req.body.images
    }
    req.body.images = null // Situacional, borrar cuando este multer
    
    Product.create(req.body)
     .then(product => res.status(201).json(product))
     .catch(next)
}

module.exports.productDetail = (req, res, next) => {
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