const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const orderController = {};

orderController.getAllOrder = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const userOrders = await prisma.order.findMany({
      where: {
        userId: parseInt(userId),
      },
      include: {
        OrderItem: true,
      },
    });
    res.status(200).json({ orders: userOrders });
  } catch (err) {
    next(err);
  }
};

// Order by user ID
orderController.getOrderByUser = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const order = await prisma.order.findMany({
      where: { userId: +userId },
      include: { orderItems },
    });

    res.status(200).json({ order });
  } catch (err) {
    next(err);
  }
};

// Create Order
orderController.createOrder = async (req, res, next) => {
  const { userId, orderItems } = req.body;

  console.log("req.body", req.body);

  console.log("++++++Request Body: ", req.body);

  // ตรวจสอบว่าข้อมูลที่จำเป็นมีอยู่ใน req.body หรือไม่
  if (!userId || !Array.isArray(orderItems) || orderItems.length === 0) {
    return res
      .status(400)
      .json({ error: "Missing required fields or invalid order items" });
  }

  try {
    // สร้าง Order ใหม่
    const order = await prisma.order.create({
      data: {
        userId,
        status: "PENDING",
        OrderItem: {
          create: orderItems.map((item) => ({
            productId: item.productId,
            itemAmount: item.itemAmount,
            totalPrice: item.totalPrice,
          })),
        },
      },
    });

    // ตรวจสอบและเพิ่มสินค้าลงใน Cart
    for (const item of orderItems) {
      const existingCartItem = await prisma.cart.findFirst({
        where: {
          userId,
          productId: item.productId,
        },
      });

      if (existingCartItem) {
        // ถ้ามีอยู่แล้วให้เพิ่มจำนวน
        await prisma.cart.update({
          where: { id: existingCartItem.id },
          data: { amount: existingCartItem.amount + item.itemAmount },
        });
      } else {
        // ถ้าไม่มีให้สร้างใหม่
        await prisma.cart.create({
          data: {
            userId,
            productId: item.productId,
            amount: item.itemAmount,
          },
        });
      }
    }

    res.status(201).json(order);
  } catch (err) {
    console.error("Error creating order: ", err);
    next(err);
  }
};

orderController.getOrderById = async (req, res, next) => {
  try {
    const { orderId, userId } = req.params;
    const order = await prisma.order.findFirst({
      where: {
        id: parseInt(orderId),
        userId: parseInt(userId),
      },
      include: {
        OrderItem: true,
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

// Update an Order
orderController.updateOrder = async (req, res, next) => {
  const { orderId } = req.params;
  const { status } = req.body;

  console.log("status=======", status);

  try {
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: {
          set: "PENDING", // ต้องเป็น Enum หรือ Enum operation ที่ถูกต้อง
        },
      },
    });
    res.status(200).json(updatedOrder);
  } catch (err) {
    next(err);
  }
};

orderController.deleteOrder = async (req, res, next) => {
  try {
    const { orderId, userId } = req.params;

    await prisma.order.delete({
      where: {
        id: parseInt(orderId),
        userId: parseInt(userId),
      },
    });

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = orderController;
