const express = require("express");
const adminController = require("../controllers/adminController");
const adminOrderController = require("../controllers/adminOrderController");
const adminPaymentController = require("../controllers/adminPaymentController");
const cartController = require("../controllers/cartController");
const adminProductController = require("../controllers/adminProductController");

const adminRouter = express.Router();

const isAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Unauthorized access" });
  }
};

// Routes for product management
adminRouter.get("/product", isAdmin, adminProductController.getAllProduct);
adminRouter.get(
  "/product/:productId",
  isAdmin,
  adminProductController.getProductById
);
adminRouter.post("/product", isAdmin, adminProductController.createProduct);
adminRouter.put(
  "/product/:productId",
  isAdmin,
  adminProductController.updateProduct
);
adminRouter.delete(
  "/product/:id",
  isAdmin,
  adminProductController.deleteProduct
);

// Routes for order management
adminRouter.get("/order", isAdmin, adminOrderController.getAllOrders);
adminRouter.get("/order/:orderId", isAdmin, adminOrderController.getOrderById);
adminRouter.patch(
  "/order/:orderId",
  isAdmin,
  adminOrderController.updateOrderStatus
);

// Routes for payment management
adminRouter.get("/payment", isAdmin, adminPaymentController.getAllPayments);
adminRouter.get(
  "/payment/:paymentId",
  isAdmin,
  adminPaymentController.getPaymentById
);

// Routes for cart management
adminRouter.patch("/cart/:cartId", isAdmin, cartController.updateCartByAdmin);
adminRouter.delete("/cart/:cartId", isAdmin, cartController.deleteCartByAdmin);

module.exports = adminRouter;
