const { PrismaClient } = require("@prisma/client");
const createError = require("../utils/createError");

const prisma = new PrismaClient();

const adminPaymentController = {};

// Get all payments
adminPaymentController.getAllPayments = async (req, res, next) => {
  try {
    const payments = await prisma.payment.findMany();
    res.status(200).json(payments);
  } catch (err) {
    next(err);
  }
};

// Get a specific payment by ID
adminPaymentController.getPaymentById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const payment = await prisma.payment.findUnique({
      where: { id: parseInt(id) },
      include: {
        orders: true,
      },
    });
    if (!payment) {
      return createError({ message: "Payment not found", statusCode: 404 });
    }
    res.status(200).json(payment);
  } catch (err) {
    next(err);
  }
};

module.exports = adminPaymentController;
