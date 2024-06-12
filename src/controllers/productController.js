const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const productController = {};

productController.createProduct = async (req, res, next) => {
  try {
    const { productImage, productType, productName, productDetail, price } =
      req.body;
    const newProduct = await prisma.product.create({
      data: {
        productImage,
        productType,
        productName,
        productDetail,
        price,
      },
    });
    res.status(200).json(newProduct);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ err: "create error" });
  }
};

productController.getAllProduct = async (req, res, next) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

productController.getProductById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await prisma.product.findUnique({
      where: {
        id: parseInt(id),
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

productController.updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const { productImage, productName, productType, productDetail, price } =
    req.body;

  try {
    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        productImage,
        productType,
        productName,
        productDetail,
        price,
        productType: productType[productType.toUppercase()],
      },
    });
  } catch (err) {
    console.log(err);
  }
};

productController.deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  console.log(id, "---------------id");

  try {
    await prisma.product.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: "delete product" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "cannot delete product" });
  }
};

module.exports = productController;
