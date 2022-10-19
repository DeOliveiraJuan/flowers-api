const createError = require('http-errors');
const User = require('../models/User.model');

module.exports.list = (req, res, next) => {
    User.find()
     .then(users => {
        res.json(users)
     })
     .catch(next)
}

module.exports.create = (req, res, next) => {
    const { name, lastName, email, password, phoneNumber } = req.body
    
    User.create({ name, lastName, email, password, phoneNumber })
     .then(user => res.status(201).json(user))
     .catch(next)
}

module.exports.currentUser = (req, res, next) => {
    
    User.findById(req.currentUser)
    .then(users => {
        res.json(users)
     })
     .catch(next)
}

module.exports.delete = (req, res, next) => {
    const { id } = req.params
    
    User.findByIdAndDelete(id)
     .then(user => res.status(204).json(user))
     .catch(next)
}

module.exports.update = (req, res, next) => {
    const { id } = req.params
    
    User.findByIdAndUpdate(id, req.body, { new: true })
     .then(user => res.status(202).json(user))
     .catch(next)
}