const express = require("express");
const cartController = require("../controllers/cartController");

const cartRouter = express.Router();

cartRouter.get("/", cartController.getCart);
cartRouter.post("/", cartController.addCart);
cartRouter.patch("/:cartId", cartController.updateCart);
cartRouter.delete("/:cartId", cartController.deleteCart);

module.exports = cartRouter;
