// const { PrismaClient } = require("@prisma/client");

// const prisma = new PrismaClient();

// const orderItemController = {};

// orderItemController.createOrderItem = async (req, res, next) => {
//   const { orderId, productId, itemAmount, totalPrice } = req.body;
//   try {
//     const orderItem = await prisma.orderItem.create({
//       data: {
//         orderId,
//         productId,
//         itemAmount,
//         totalPrice,
//       },
//     });
//     res.status(201).json(orderItem);
//   } catch (err) {
//     next(err);
//   }
// };

// // Read all OrderItems
// orderItemController.getAllOrderItems = async (req, res) => {
//   try {
//     const orderItems = await prisma.orderItem.findMany();
//     res.status(200).json(orderItems);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // Read a single OrderItem
// orderItemController.getOrderItemById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const orderItem = await prisma.orderItem.findUnique({
//       where: { id: parseInt(id, 10) },
//     });
//     res.status(200).json(orderItem);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // Update an OrderItem
// orderItemController.updateOrderItem = async (req, res) => {
//   const { id } = req.params;
//   const { orderId, productId, itemAmount, totalPrice } = req.body;
//   try {
//     const orderItem = await prisma.orderItem.update({
//       where: { id: parseInt(id, 10) },
//       data: {
//         orderId,
//         productId,
//         itemAmount,
//         totalPrice,
//       },
//     });
//     res.status(200).json(orderItem);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// // Delete an OrderItem
// orderItemController.deleteOrderItem = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const orderItem = await prisma.orderItem.delete({
//       where: { id: parseInt(id, 10) },
//     });
//     res.status(200).json(orderItem);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

// module.exports = orderItemController;

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const orderItemController = {};

orderItemController.createOrderItem = async (req, res, next) => {
  const { productId, itemAmount } = req.body;

  const { user } = req;

  if (!productId || !itemAmount) {
    return res.status(400).json({
      error: "Missing required fields: userId, productId, itemAmount",
    });
  }

  try {
    // หา product
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // ตรวจสอบว่ามี Order ที่เป็น PENDING สำหรับ userId หรือไม่
    let order = await prisma.order.findFirst({
      where: { userId: user.id, status: "PENDING" },
    });

    // ถ้าไม่มี ให้สร้าง Order ใหม่
    if (!order) {
      order = await prisma.order.create({
        data: {
          userId: user.id,
          status: "PENDING",
        },
      });
    }

    // สร้าง OrderItem
    const orderItem = await prisma.orderItem.create({
      data: {
        orderId: order.id,
        productId,
        itemAmount,
        totalPrice: +product.price * +itemAmount,
      },
    });

    // ตรวจสอบว่ามี product ใน Cart แล้วหรือยัง
    const existingCartItem = await prisma.cart.findFirst({
      where: {
        userId: user.id,
        productId,
      },
    });

    if (existingCartItem) {
      // ถ้ามีอยู่แล้วให้เพิ่มจำนวน
      await prisma.cart.update({
        where: { id: existingCartItem.id },
        data: { amount: existingCartItem.amount + itemAmount },
      });
    } else {
      // ถ้าไม่มีให้สร้างใหม่
      await prisma.cart.create({
        data: {
          userId: user.id,
          productId,
          amount: itemAmount,
        },
      });
    }

    res.status(201).json(orderItem);
  } catch (err) {
    console.log("err----", err);
    next(err);
  }
};

// Read all OrderItems
orderItemController.getAllOrderItems = async (req, res, next) => {
  try {
    const orderItems = await prisma.orderItem.findMany();
    res.status(200).json(orderItems);
  } catch (err) {
    next(err);
  }
};

// Read a single OrderItem
orderItemController.getOrderItemById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const orderItem = await prisma.orderItem.findUnique({
      where: { id: parseInt(id, 10) },
    });
    res.status(200).json(orderItem);
  } catch (err) {
    next(err);
  }
};

// Update an OrderItem
orderItemController.updateOrderItem = async (req, res, next) => {
  const { id } = req.params;
  const { orderId, productId, itemAmount, totalPrice } = req.body;
  try {
    const orderItem = await prisma.orderItem.update({
      where: { id: +id },
      data: {
        orderId,
        productId,
        itemAmount,
        totalPrice,
      },
    });
    res.status(200).json(orderItem);
  } catch (err) {
    next(err);
  }
};

// Delete an OrderItem
orderItemController.deleteOrderItem = async (req, res, next) => {
  const { id } = req.params;
  try {
    const orderItem = await prisma.orderItem.delete({
      where: { id: parseInt(id, 10) },
    });
    res.status(200).json(orderItem);
  } catch (err) {
    next(err);
  }
};

module.exports = orderItemController;
