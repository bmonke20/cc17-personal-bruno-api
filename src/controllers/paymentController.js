const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const paymentController = {};

paymentController.getAllPayment = async (req, res, next) => {
  try {
    const payments = await prisma.payment.findMany();
    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: "Could not retrieve payments" });
  }
};

paymentController.createPayment = async (req, res, next) => {
  const { orderId, amountTotal, priceTotal, paymentDate, slipImage } = req.body;

  try {
    const newPayment = await prisma.payment.create({
      data: {
        orderId,
        amountTotal,
        priceTotal,
        paymentDate,
        slipImage,
      },
    });

    res.json(newPayment);
  } catch (err) {
    next(err);
    res.status(500).json({ error: "Could not create payment" });
  }
};

paymentController.getPaymentById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const payment = await prisma.payment.findUnique({
      where: { id: parseInt(id) },
      include: { orders: true },
    });

    if (!payment) {
      return res.status(404).json({ error: "Payment not found" });
    }

    res.json(payment);
  } catch (err) {
    res.status(500).json({ error: "Could not retrieve payment" });
    next(err);
  }
};

paymentController.updatePayment = async (req, res, next) => {
  const { id } = req.params;
  const { amountTotal, priceTotal, paymentDate, slipImage } = req.body;

  try {
    const updatedPayment = await prisma.payment.update({
      where: { id: parseInt(id) },
      data: {
        amountTotal,
        priceTotal,
        paymentDate,
        slipImage,
      },
    });

    res.json(updatedPayment);
  } catch (err) {
    next(err);
  }
};

paymentController.deletePayment = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedPayment = await prisma.payment.delete({
      where: { id: parseInt(id) },
    });

    res.json(deletedPayment);
  } catch (err) {
    next(err);
  }
};

module.exports = paymentController;
