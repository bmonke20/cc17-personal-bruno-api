const { PrismaClient } = require("@prisma/client");
const createError = require("../utils/createError");

const prisma = new PrismaClient();

const adminOrderController = {};

// Get all orders
adminOrderController.getAllOrders = async (req, res, next) => {
  try {
    const orders = await prisma.order.findMany();
    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
};

// Get a specific order by ID
adminOrderController.getOrderById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const order = await prisma.order.findUnique({
      where: { id: parseInt(id) },
      include: {
        OrderItem: true,
        Payment: true,
      },
    });
    if (!order) {
      return createError({ message: "Order not found", statusCode: 404 });
    }
    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
};

// Update the status of an order by ID
adminOrderController.updateOrderStatus = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updatedOrder = await prisma.order.update({
      where: { id: parseInt(id) },
      data: { status },
    });
    res.status(200).json(updatedOrder);
  } catch (err) {
    next(err);
  }
};

module.exports = adminOrderController;
