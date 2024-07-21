// const { PrismaClient } = require("@prisma/client");

// const prisma = new PrismaClient();

// const paymentController = {};

// paymentController.getAllPayment = async (req, res, next) => {
//   try {
//     const payments = await prisma.payment.findMany();
//     res.json(payments);
//   } catch (error) {
//     res.status(500).json({ error: "Could not retrieve payments" });
//   }
// };

// paymentController.createPayment = async (req, res, next) => {
//   const { orderId, amountTotal, priceTotal, paymentDate, slipImage } = req.body;

//   try {
//     const newPayment = await prisma.payment.create({
//       data: {
//         orderId,
//         amountTotal,
//         priceTotal,
//         paymentDate,
//         slipImage,
//       },
//     });

//     res.json(newPayment);
//   } catch (err) {
//     next(err);
//     res.status(500).json({ error: "Could not create payment" });
//   }
// };

// paymentController.getPaymentById = async (req, res, next) => {
//   const { id } = req.params;

//   try {
//     const payment = await prisma.payment.findUnique({
//       where: { id: parseInt(id) },
//       include: { orders: true },
//     });

//     if (!payment) {
//       return res.status(404).json({ error: "Payment not found" });
//     }

//     res.json(payment);
//   } catch (err) {
//     res.status(500).json({ error: "Could not retrieve payment" });
//     next(err);
//   }
// };

// paymentController.updatePayment = async (req, res, next) => {
//   const { id } = req.params;
//   const { amountTotal, priceTotal, paymentDate, slipImage } = req.body;

//   try {
//     const updatedPayment = await prisma.payment.update({
//       where: { id: parseInt(id) },
//       data: {
//         amountTotal,
//         priceTotal,
//         paymentDate,
//         slipImage,
//       },
//     });

//     res.json(updatedPayment);
//   } catch (err) {
//     next(err);
//   }
// };

// paymentController.deletePayment = async (req, res, next) => {
//   const { id } = req.params;

//   try {
//     const deletedPayment = await prisma.payment.delete({
//       where: { id: parseInt(id) },
//     });

//     res.json(deletedPayment);
//   } catch (err) {
//     next(err);
//   }
// };

// module.exports = paymentController;

const { PrismaClient } = require("@prisma/client");
const uploadService = require("../services/uploadService");

const prisma = new PrismaClient();

const paymentController = {};

paymentController.getAllPayment = async (req, res, next) => {
  try {
    const payments = await prisma.payment.findMany({
      include: {
        order: {
          include: {
            OrderItem: { include: { products: true } },
          },
        },
      },
    });
    res.status(200).json(payments);
  } catch (err) {
    next(err);
  }
};

paymentController.createPayment = async (req, res, next) => {
  const { orderId, amountTotal, priceTotal, paymentDate, slipImage } = req.body;

  const result = await uploadService.upload(req.file.path);

  try {
    const existingOrder = await prisma.order.findUnique({
      where: {
        id: +orderId,
      },
    });

    if (!existingOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    const newPayment = await prisma.payment.create({
      data: {
        orderId: +orderId,
        amountTotal: +amountTotal,
        priceTotal: +priceTotal,
        paymentDate,
        slipImage: result,
      },
    });

    res.json(newPayment);
  } catch (err) {
    next(err);
  }
};

paymentController.getPaymentById = async (req, res, next) => {
  const { orderId } = req.params;

  try {
    const payment = await prisma.payment.findUnique({
      where: {
        orderId: +orderId,
      },
    });

    res.status(200).json(payment);
  } catch (err) {
    next(err);
  }
};

paymentController.updatePayment = async (req, res, next) => {
  const { orderId } = req.params;
  const { status } = req.body;

  // ตรวจสอบค่า status
  if (!["PENDING", "SUCCESS", "DECLINE"].includes(status)) {
    return res.status(400).json({ error: "Invalid status value" });
  }

  try {
    const updatedOrder = await prisma.order.update({
      where: {
        id: parseInt(orderId),
      },
      data: {
        status: status, // ใช้ status ที่ถูกต้อง
      },
    });
    res.status(200).json(updatedOrder);
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
