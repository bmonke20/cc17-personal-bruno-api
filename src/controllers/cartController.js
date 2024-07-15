const { PrismaClient } = require("@prisma/client");
const createError = require("../utils/createError");

const prisma = new PrismaClient();

const cartController = {};

cartController.getCart = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const cart = await prisma.cart.findMany({
      where: { userId: parseInt(userId) },
      include: { products: true },
    });
    res.status(200).json(cart);
  } catch (err) {
    next(err);
  }
};

cartController.addCart = async (req, res, next) => {
  const { productId, amount, userId } = req.body;

  try {
    if (!productId || !amount || !userId) {
      createError(400, "productId, amount, and userId are required");
    }

    const newItem = await prisma.cart.create({
      data: {
        productId: +productId,
        amount: +amount,
        userId: +userId,
      },
    });
    res.status(201).json(newItem);
  } catch (err) {
    next(err);
  }
};

cartController.updateCart = async (req, res, next) => {
  const { cartId } = req.params;
  const { amount } = req.body;

  try {
    const updateItem = await prisma.cart.update({
      where: { id: +cartId },
      data: { amount: +amount },
    });

    if (!updateItem) {
      createError(404, `Item ${cartId} not found`);
    }

    res.status(200).json(updateItem);
  } catch (err) {
    next(err);
  }
};

cartController.deleteCart = async (req, res, next) => {
  const { cartId } = req.params;

  try {
    const deleteItem = await prisma.cart.delete({
      where: { id: +cartId },
    });

    if (!deleteItem) {
      createError(404, `Item ${cartId} not found`);
    }

    res.status(200).json(deleteItem);
  } catch (err) {
    next(err);
  }
};

// Controller สำหรับ admin
cartController.updateCartByAdmin = async (req, res, next) => {
  const { cartId } = req.params;
  const { amount } = req.body;

  try {
    const updateItem = await prisma.cart.update({
      where: { id: +cartId },
      data: { amount: +amount },
    });

    if (!updateItem) {
      createError(404, `Item ${cartId} not found`);
    }

    res.status(200).json(updateItem);
  } catch (err) {
    next(err);
  }
};

cartController.deleteCartByAdmin = async (req, res, next) => {
  const { cartId } = req.params;

  try {
    const deleteItem = await prisma.cart.delete({
      where: { id: +cartId },
    });

    if (!deleteItem) {
      createError(404, `Item ${cartId} not found`);
    }

    res.status(200).json(deleteItem);
  } catch (err) {
    next(err);
  }
};

module.exports = cartController;
