const router = require("express").Router();
const usersController = require("../controllers/users.controller");
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const productsController = require("../controllers/products.controller");
const shippingAddressController = require("../controllers/shippingAddress.controller");
const shoppingCartController = require("../controllers/shoppingCart.controller");
const multer = require("multer");
//const upload = multer({ dest: 'uploads/' })

//Users

router.get("/users", usersController.list);
router.post("/users", usersController.create);
router.get(
  "/users/me",
  authMiddleware.isAuthenticated,
  usersController.getCurrentUser
);
router.delete(
  "/users/:id/delete",
  authMiddleware.isAuthenticated,
  usersController.delete
);
router.put(
  "/users/:id/edit",
  authMiddleware.isAuthenticated,
  usersController.update
);

//Shipping Address

router.get(
  "/users/addresses",
  authMiddleware.isAuthenticated,
  shippingAddressController.list
);
router.post(
  "/users/addresses",
  authMiddleware.isAuthenticated,
  shippingAddressController.create
);
router.delete(
  "/users/addresses/:id",
  authMiddleware.isAuthenticated,
  shippingAddressController.delete
);
router.put(
  "/users/addresses/:id",
  authMiddleware.isAuthenticated,
  shippingAddressController.update
);

//Auth

router.post("/login", authController.login);

//Products (FALTA INCLUIR EL AUTH QUE SE ELIMINO PARA PROBAR POSTMAN)

router.get("/products", productsController.list);
router.get("/products/plants", productsController.listPlants);
router.get("/products/flowers", productsController.listFlowers);
router.get("/products/:id", productsController.productDetail);
router.post("/products", productsController.create);
router.delete("/products/:id", productsController.delete);
router.put("/products/:id", productsController.update);

//Shopping cart

router.post("/cart", shoppingCartController.create);
router.get("/cart/:id", shoppingCartController.get);
router.put("/cart/:id", shoppingCartController.updateUserId);
router.put("/cart/add/:id", shoppingCartController.add);
router.put("/cart/remove/:id", shoppingCartController.remove);

module.exports = router;
