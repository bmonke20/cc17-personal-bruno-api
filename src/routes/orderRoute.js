const express = require("express");
const orderController = require("../controllers/orderController");

const orderRouter = express.Router();

orderRouter.get("/", orderController.getAllOrder);
orderRouter.post("/", orderController.createOrder);
orderRouter.get("/:orderId", orderController.getOrderById);
orderRouter.put("/:orderId/status", orderController.updateOrder);
orderRouter.delete("/:orderId", orderController.deleteOrder);

module.exports = orderRouter;
