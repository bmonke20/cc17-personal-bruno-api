const express = require("express");
const cartController = require("../controllers/cartController");
const authenticate = require("../middlewares/authentication");

const cartRouter = express.Router();

cartRouter.post("/", authenticate, cartController.createCart);
cartRouter.get("/:userId", authenticate, cartController.getCart);
cartRouter.patch("/:cartId", authenticate, cartController.updateCart);
cartRouter.delete("/:cartId", authenticate, cartController.deleteCart);
cartRouter.delete("/clear/:userId", authenticate, cartController.clearCart);

module.exports = cartRouter;
