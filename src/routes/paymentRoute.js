const express = require("express");
const paymentController = require("../controllers/paymentController");

const paymentRouter = express.Router();

paymentRouter.get("/", paymentController.getPayment);
paymentRouter.post("/", paymentController.createPayment);

module.exports = paymentRouter;
