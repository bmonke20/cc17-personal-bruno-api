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
  const { userId, status, orderItems } = req.body;

  try {
    const newOrder = await prisma.order.create({
      data: {
        userId,
        status,
        orderItems: {
          createMany: {
            data: orderItems,
          },
        },
      },
      include: { orderItems: true, Payment: true },
    });

    res.json(newOrder);
  } catch (err) {
    next(err);
    res.status(500).json({ error: "Could not create order" });
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
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedOrder = await prisma.order.update({
      where: { id: parseInt(id) },
      data: { status },
    });

    res.json(updatedOrder);
  } catch (err) {
    next(err);
    res.status(500).json({ error: "Could not update order status" });
  }
};

orderController.deleteOrder = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedOrder = await prisma.order.delete({
      where: { id: parseInt(id) },
    });

    res.json(deletedOrder);
  } catch (err) {
    next(err);
    res.status(500).json({ error: "Could not delete order" });
  }
};

module.exports = orderController;
