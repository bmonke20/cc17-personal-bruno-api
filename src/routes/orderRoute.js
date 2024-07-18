const express = require("express");
const orderController = require("../controllers/orderController");
const authenticate = require("../middlewares/authentication");

const orderRouter = express.Router();

// Get all orders
orderRouter.get("", authenticate, orderController.getAllOrder);

// Get orders by user ID
orderRouter.get("/:userId", authenticate, orderController.getOrderByUser);

// Create a new order
orderRouter.post("", authenticate, orderController.createOrder);

// Get order by ID
orderRouter.get("/:orderId", authenticate, orderController.getOrderById);

// Update order status by order ID
orderRouter.patch(
  "/:orderId/status",
  authenticate,
  orderController.updateOrder
);

// Delete order by order ID
orderRouter.delete("/:orderId", authenticate, orderController.deleteOrder);

module.exports = orderRouter;
