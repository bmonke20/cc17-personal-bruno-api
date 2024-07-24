const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const orderItemController = {};

orderItemController.createOrderItem = async (req, res, next) => {
  const { productId, itemAmount } = req.body;
  const { user } = req;

  if (!productId || !itemAmount) {
    return res
      .status(400)
      .json({ error: "Missing required fields: productId, itemAmount" });
  }

  try {
    let order = await prisma.order.findFirst({
      where: {
        userId: user.id,
        status: "PENDING",
      },
    });

    if (!order) {
      order = await prisma.order.create({
        data: {
          userId: user.id,
          status: "PENDING",
        },
      });
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const orderItem = await prisma.orderItem.create({
      data: {
        orderId: order.id,
        productId,
        itemAmount,
        totalPrice: +product.price * +itemAmount,
      },
    });

    res.status(201).json(orderItem);
  } catch (err) {
    next(err);
  }
};

orderItemController.getOrderItem = async (req, res, next) => {
  const { user } = req;

  try {
    const orderItem = await prisma.orderItem.findMany({
      where: {
        orderId: {
          userId: user.id,
        },
      },
    });

    res.status(200).json({ orderItem });
  } catch (err) {
    next(err);
  }
};

orderItemController.updateOrderItem = async (req, res, next) => {
  const { user } = req;
  const { productId, itemAmount } = req.body;

  try {
    const orderItem = await prisma.orderItem.update({
      where: {
        orderId: user.id,
        productId: +productId,
      },
      data: {
        itemAmount: itemAmount,
      },
    });

    res.status(200).json({ orderItem });
  } catch (err) {
    next(err);
  }
};

orderItemController.deleteOrderItem = async (req, res, next) => {
  const { user } = req;
  const { productId } = req.body;

  try {
    await prisma.orderItem.deleteMany({
      where: {
        orderId: user.id,
        productId: productId,
      },
    });

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = orderItemController;
