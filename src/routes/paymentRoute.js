const express = require("express");
const paymentController = require("../controllers/paymentController");
const upload = require("../middlewares/upload");

const paymentRouter = express.Router();

paymentRouter.post(
  "/",
  upload.single("slipImage"),
  paymentController.createPayment
);
paymentRouter.get("/", paymentController.getAllPayment);
paymentRouter.get("/:orderId", paymentController.getPaymentById);
paymentRouter.patch("/:orderId", paymentController.updatePayment);
paymentRouter.delete("/:paymentId", paymentController.deletePayment);

module.exports = paymentRouter;
