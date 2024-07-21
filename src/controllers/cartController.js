const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const cartController = {};

cartController.createCart = async (req, res, next) => {
  const { productId, amount } = req.body;
  const { user } = req;

  // console.log("----createCart", req.body);

  try {
    const newCart = await prisma.cart.create({
      data: { userId: user.id, productId, amount },
      include: { products: true },
    });
    res.status(200).json({ newCart });
  } catch (err) {
    next(err);
  }
};

cartController.getCart = async (req, res, next) => {
  const { user } = req;

  try {
    const cartItem = await prisma.cart.findMany({
      where: { userId: user.id },
      include: { products: true },
    });
    res.status(200).json({ cartItem });
  } catch (err) {
    next(err);
  }
};

cartController.updateCart = async (req, res, next) => {
  const { cartId } = req.params;
  const { amount } = req.body;

  // console.log("=====", req.params);

  try {
    const updateCart = await prisma.cart.update({
      where: { id: +cartId },
      data: { amount },
      include: { products: true },
    });
    // console.log(updateCart);
    res.status(200).json({ updateCart });
  } catch (err) {
    next(err);
  }
};

cartController.deleteCart = async (req, res, next) => {
  // const { id } = req.params;

  // console.log(req.params);

  try {
    const deleteCart = await prisma.cart.delete({
      where: { id: +req.params.cartId },
      include: { products: true },
    });
    res.status(200).json({ deleteCart });
  } catch (err) {
    next(err);
  }
};

cartController.clearCart = async (req, res, next) => {
  const { user } = req;

  try {
    const clearCart = await prisma.cart.deleteMany({
      where: { userId: user.id },
    });
    res.status(200).json({ clearCart });
  } catch (err) {
    next(err);
  }
};

module.exports = cartController;
