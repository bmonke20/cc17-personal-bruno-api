const { PrismaClient } = require("@prisma/client");
const createError = require("../utils/createError");

const prisma = new PrismaClient();

const cartController = {};

cartController.getCart = async (req, res, next) => {
  try {
    const cart = await prisma.cart.findMany();
    res.status(200).json(cart);
  } catch (err) {
    next(err);
  }
};

cartController.addCart = async (req, res, next) => {
  const { productId, amount, userId } = req.body;

  try {
    if (!productId || !amount || !userId) {
      createError({ message: "require" });
    }

    const newItem = await prisma.cart.create({
      data: {
        productId: +req.body,
        amount,
        userId,
      },
    });
    res.status(201).json(newItem);
  } catch (err) {
    next(err);
  }
};

cartController.updateCart = async (req, res, next) => {
  const { id } = req.params;
  const { amount } = req.body;

  try {
    const updateItem = await prisma.cart.update({
      where: {
        id,
      },
      data: {
        amount,
      },
    });

    if (!updateItem) {
      createError(404, `Item ${id} not found`);
    }

    res.status(200).json(updateItem);
  } catch (err) {
    next(err);
  }
};

cartController.deleteCart = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deleteItem = await prisma.cart.delete({
      where: { id },
    });

    if (!deleteItem) {
      createError(404, `Item ${id} not delete`);
    }

    res.status(200).json(deleteItem);
  } catch (err) {
    next(err);
  }
};

module.exports = cartController;
