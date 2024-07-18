const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const cartController = {};

cartController.addToCart = async (req, res, next) => {
  const { userId, productId, amount } = req.body;

  if (!userId || !productId || !amount) {
    return res
      .status(400)
      .json({ error: "userId, productId, และ amount เป็นค่าที่จำเป็น" });
  }
  try {
    // Add product to Cart
    const cartItem = await prisma.cart.create({
      data: {
        userId: userId,
        productId: productId,
        amount: amount,
      },
    });

    res.status(201).json({ message: "Product added to cart", cartItem });
  } catch (error) {
    next(error);
  }
};

cartController.createOrder = async (req, res, next) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "userId เป็นค่าที่จำเป็น" });
  }
  try {
    // Create a new order with items from cart
    const userCartItems = await prisma.cart.findMany({
      where: {
        userId: parseInt(userId),
      },
      include: {
        products: true,
      },
    });

    const orderItems = userCartItems.map((item) => {
      return {
        productId: item.productId,
        itemAmount: item.amount,
        totalPrice: item.products.price * item.amount,
      };
    });

    // Create Order
    const newOrder = await prisma.order.create({
      data: {
        userId: parseInt(userId),
        status: "PENDING",
        OrderItem: {
          createMany: {
            data: orderItems,
          },
        },
      },
      include: {
        OrderItem: true,
      },
    });

    // Clear user's cart after creating order
    await prisma.cart.deleteMany({
      where: {
        userId: parseInt(userId),
      },
    });

    res.status(201).json({ message: "Order created successfully", newOrder });
  } catch (error) {
    next(error);
  }
};

module.exports = cartController;
