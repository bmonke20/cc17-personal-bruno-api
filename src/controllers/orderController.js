const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const orderController = {};

orderController.getAllOrder = async (req, res, next) => {
  try {
    const order = await prisma.order.findMany();
    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
};

orderController.createOrder = async (req, res, next) => {
  const { userId, item, totalAmount, totalPrice } = req.body;

  try {
    const newOrder = await prisma.order.create({
      data: {
        userId,
        totalAmount,
        totalPrice,
      },
    });

    for (const item of item) {
      await prisma.orderItem.create({
        data: {
          orderId: newOrder.id,
          productId: item.productId,
          quantity: item.quantity,
        },
      });
    }

    res.status(200).json(newOrder);
  } catch (err) {
    next(err);
  }
};

orderController.getOrderById = async (req, res, next) => {
  const { orderId } = req.params;

  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { orderItem: true },
    });

    if (!order) {
      return res.status(404).json({ message: "Order not Found" });
    }

    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
};

orderController.updateOrder = async (req, res, next) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    const updateOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status },
    });

    res.status(200).json(updateOrder);
  } catch (err) {
    next(err);
  }
};

orderController.deleteOrder = async (req, res, next) => {
  const { orderId } = req.params;

  try {
    await prisma.order.delete({
      where: { id: orderId },
    });

    res.status(200).json({ message: "Delete order" });
  } catch (err) {
    next(err);
  }
};

module.exports = orderController;
