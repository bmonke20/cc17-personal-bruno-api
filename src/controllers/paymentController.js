const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const paymentController = {};

paymentController.getPayment = async (req, res, next) => {
  try {
    const payment = await prisma.payment.findMany();
    res.status(200).json(payment);
  } catch (err) {
    next(er);
  }
};
paymentController.createPayment = async (req, res, next) => {
  const { orderId, amountTotal, priceTotal, paymentDate, slipImage } = req.body;

  try {
    const newPayment = await prisma.payment.create({
      data: {
        orderId: orderId,
        amountTotal: +req.body,
        priceTotal: priceTotal,
        paymentDate: paymentDate,
        slipImage: slipImage,
      },
    });

    const cartItem = req.body.cartItem;
    for (const item of cartItem) {
      await prisma.cart.delete({
        where: { id: item.id },
      });
    }

    res.status(200).json(newPayment);
  } catch (err) {
    next(err);
  }
};

module.exports = paymentController;
