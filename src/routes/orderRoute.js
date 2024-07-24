const express = require("express");
const authenticate = require("../middlewares/authentication");
const orderController = require("../controllers/orderController");

const orderRouter = express.Router();

orderRouter.post("/", authenticate, orderController.createOder);
orderRouter.get("/:userId", authenticate, orderController.getOrder);

orderRouter.get("/", orderController.getAllOrder);

orderRouter.patch(
  "/:orderId/:userId",
  authenticate,
  orderController.updateOrder
);

orderRouter.delete("/:orderId", authenticate, orderController.deleteOrder);

module.exports = orderRouter;
