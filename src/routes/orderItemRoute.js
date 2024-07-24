const express = require("express");
const orderItemController = require("../controllers/oderItemController");
const authenticate = require("../middlewares/authentication");

const orderItemRouter = express.Router();

orderItemRouter.post("/", authenticate, orderItemController.createOrderItem);
orderItemRouter.get("/", authenticate, orderItemController.getOrderItem);
orderItemRouter.patch(
  "/:userId",
  authenticate,
  orderItemController.updateOrderItem
);
orderItemRouter.delete(
  "/:userId",
  authenticate,
  orderItemController.deleteOrderItem
);

module.exports = orderItemRouter;
