const ShoppingCart = require("../models/ShoppingCart.model");

module.exports.create = (req, res, next) => {
  ShoppingCart.create(req.body)
    .then((cart) => res.status(201).json(cart))
    .catch(next);
};

module.exports.get = (req, res, next) => {
  const { id } = req.params;

  ShoppingCart.findById(id)
    .populate("products.productId")
    .then((cart) => {
      res.json(cart);
    })
    .catch(next);
};

module.exports.add = (req, res, next) => {
  const { id } = req.params;
  const { productId } = req.body;

  ShoppingCart.findById(id)
    .then((cart) => {
      const productsUpdated = [...cart.products];

      const productFound = cart.products.findIndex((e) =>
        e.productId.equals(productId)
      );

      if (productFound >= 0) {
        productsUpdated[productFound].qty =
          productsUpdated[productFound].qty + 1;
      } else {
        productsUpdated.push({ productId, qty: 1 });
      }

      ShoppingCart.findByIdAndUpdate(
        id,
        { products: productsUpdated },
        { new: true }
      )
        .populate("products.productId")
        .then((cart) => res.json(cart))
        .catch(next);
    })
    .catch(next);
};

module.exports.remove = (req, res, next) => {
  const { id } = req.params;
  const { productId } = req.body;

  ShoppingCart.findById(id)
    .then((cart) => {
      const productsUpdated = [...cart.products];

      const productFound = cart.products.findIndex((e) =>
        e.productId.equals(productId)
      );

      if (productFound >= 0) {
        if (productsUpdated[productFound].qty <= 1) {
          productsUpdated = productsUpdated.filter(
            (e) => !e.productId.equals(productId)
          );
        } else {
          productsUpdated[productFound].qty =
            productsUpdated[productFound].qty - 1;
        }
      }

      console.log("entro aqui", productsUpdated);

      ShoppingCart.findByIdAndUpdate(
        id,
        { products: productsUpdated },
        { new: true }
      )
        .populate("products.productId")
        .then((cart) => res.json(cart))
        .catch(next);
    })
    .catch(next);
};

module.exports.updateUserId = (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.body;

  if (!userId) {
    res.status(400).json({ message: "El userId es obligatorio" });
  } else {
    ShoppingCart.findByIdAndUpdate(id, { userId }, { new: true })
      .populate("products.productId")
      .then((cart) => res.status(202).json(cart))
      .catch(next);
  }
};
