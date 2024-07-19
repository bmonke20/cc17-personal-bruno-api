// const express = require("express");
// const orderItemController = require("../controllers/oderItemController");
// const authenticate = require("../middlewares/authentication");

// const orderItemRouter = express.Router();

// orderItemRouter.post("/", authenticate, orderItemController.createOrderItem);

// orderItemRouter.get("/", authenticate, orderItemController.getAllOrderItems);

// orderItemRouter.get("/:id", authenticate, orderItemController.getOrderItemById);

// orderItemRouter.patch(
//   "/:id",
//   authenticate,
//   orderItemController.updateOrderItem
// );

// orderItemRouter.delete(
//   "/:id",
//   authenticate,
//   orderItemController.deleteOrderItem
// );

// module.exports = orderItemRouter;

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
