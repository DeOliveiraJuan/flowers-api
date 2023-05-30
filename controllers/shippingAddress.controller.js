const ShippingAddress = require("../models/ShippingAddress.model");

module.exports.list = (req, res, next) => {
  ShippingAddress.find({ user: req.currentUser })
    .then((shippingAddress) => {
      res.json(shippingAddress);
    })
    .catch(next);
};

module.exports.create = (req, res, next) => {
  const { addressName, street, streetNumber, floor, door, city, zipCode } = req.body;

  ShippingAddress.create({
    user: req.currentUser,
    addressName,
    street,
    streetNumber,
    floor,
    door,
    city,
    zipCode,
  })
    .then((shippingAddress) => res.status(201).json(shippingAddress))
    .catch(next);
};

module.exports.update = (req, res, next) => {
    const { id } = req.params
    
    ShippingAddress.findByIdAndUpdate(id, req.body, { new: true })
     .then(shippingAddress => res.status(202).json(shippingAddress))
     .catch(next)
}

module.exports.delete = (req, res, next) => {
  const { id } = req.params
  console.log('ENTRO EN ID DELETE', id)

  ShippingAddress.findByIdAndDelete(id)
    .then(shippingAddress => res.status(204).json(shippingAddress))
    .catch(next);
};

