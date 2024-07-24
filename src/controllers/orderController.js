const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const orderController = {};

orderController.createOder = async (req, res, next) => {
  const { OrderItem } = req.body;
  const { user } = req;

  // console.log("first", req.body);
  // console.log(OrderItem);

  if (!user.id || !req.body.OrderItem || req.body.OrderItem.length === 0) {
    return res
      .status(400)
      .json({ error: "Missing required fields or invalid order items" });
  }

  try {
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        status: "PENDING",
        OrderItem: {
          create: OrderItem.map((item) => ({
            productId: item.productId,
            itemAmount: item.itemAmount,
            totalPrice: item.totalPrice,
          })),
        },
      },
      include: {
        OrderItem: true,
      },
    });

    await prisma.cart.deleteMany({
      where: {
        userId: user.id,
        productId: {
          in: OrderItem.map((item) => item.productId),
        },
      },
    });

    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

orderController.getOrder = async (req, res, next) => {
  const { orderId } = req.params;
  const { user } = req;

  // console.log("user", user);
  // console.log("orderId", orderId);

  if (!user.id) {
    return res
      .status(400)
      .json({ error: "Missing required fields or invalid order items" });
  }

  try {
    const order = await prisma.order.findMany({
      where: { userId: +user.id },
      include: {
        OrderItem: { include: { products: true } },
      },
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ order });
  } catch (err) {
    next(err);
  }
};

orderController.getAllOrder = async (req, res, next) => {
  console.log("first");
  try {
    const order = await prisma.order.findMany({
      include: { OrderItem: { include: { products: true } } },
    });

    res.status(200).json({ order });
  } catch (err) {
    next(err);
  }
};

orderController.updateOrder = async (req, res, next) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    const updatedOrder = await prisma.order.update({
      where: { id: +orderId },
      data: {
        status: status,
      },
      include: {
        OrderItem: true,
      },
    });

    res.status(200).json(updatedOrder);
  } catch (err) {
    next(err);
  }
};

orderController.deleteOrder = async (req, res, next) => {
  const { orderId } = req.params;

  console.log("===========", req.params);

  try {
    // ตรวจสอบว่ามีข้อมูล Payment หรือไม่
    const payment = await prisma.payment.findUnique({
      where: {
        orderId: +orderId,
      },
    });

    if (payment) {
      // ลบข้อมูล Payment
      await prisma.payment.delete({
        where: {
          orderId: +orderId,
        },
      });
    }

    // ลบข้อมูลที่เกี่ยวข้องก่อน
    await prisma.orderItem.deleteMany({
      where: {
        orderId: +orderId,
      },
    });

    // ลบข้อมูลในตารางหลัก
    await prisma.order.delete({
      where: {
        id: +orderId,
      },
    });

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = orderController;
