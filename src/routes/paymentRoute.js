const express = require("express");
const paymentController = require("../controllers/paymentController");
const upload = require("../middlewares/upload");
const authenticate = require("../middlewares/authentication");

const paymentRouter = express.Router();

paymentRouter.post(
  "/",
  upload.single("slipImage"),
  authenticate,
  paymentController.createPayment
);
paymentRouter.get("/", authenticate, paymentController.getAllPayment);
paymentRouter.get("/:orderId", authenticate, paymentController.getPaymentById);
paymentRouter.patch("/:orderId", authenticate, paymentController.updatePayment);
paymentRouter.delete(
  "/:paymentId",
  authenticate,
  paymentController.deletePayment
);

module.exports = paymentRouter;
