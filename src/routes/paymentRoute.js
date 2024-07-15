const express = require("express");
const paymentController = require("../controllers/paymentController");

const paymentRouter = express.Router();

paymentRouter.post("/", paymentController.createPayment);
paymentRouter.get("/", paymentController.getAllPayment);
paymentRouter.get("/:paymentId", paymentController.getPaymentById);
paymentRouter.put("/:paymentId", paymentController.updatePayment);
paymentRouter.delete("/:paymentId", paymentController.deletePayment);

module.exports = paymentRouter;
