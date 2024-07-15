const { PrismaClient } = require("@prisma/client");
const uploadService = require("../services/uploadService");

const prisma = new PrismaClient();
const adminProductController = {};

adminProductController.createProduct = async (req, res, next) => {
  const { productImage, productType, productName, productDetail, price } =
    req.body;

  try {
    const newProduct = await prisma.product.create({
      data: {
        productImage,
        productType,
        productName,
        productDetail,
        price: parseFloat(price),
      },
    });

    res.json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Could not create product" });
  }
};

adminProductController.getAllProduct = async (req, res, next) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

adminProductController.getProductById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });
    if (!product) {
      return res.status(404).json({ err: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "no fetch product" });
  }
};

adminProductController.updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const { productImage, productType, productName, productDetail, price } =
    req.body;

  try {
    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        productImage,
        productType,
        productName,
        productDetail,
        price: parseFloat(price),
      },
    });

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Could not update product" });
  }
};

adminProductController.deleteProduct = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedProduct = await prisma.product.delete({
      where: { id: parseInt(id) },
    });

    res.json(deletedProduct);
  } catch (error) {
    res.status(500).json({ error: "Could not delete product" });
  }
};

module.exports = adminProductController;
