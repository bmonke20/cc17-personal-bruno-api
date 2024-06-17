const { PrismaClient } = require("@prisma/client");
const uploadService = require("../services/uploadService");

const prisma = new PrismaClient();
const productController = {};

productController.createProduct = async (req, res, next) => {
  const { productImage, productType, productName, productDetail, price } =
    req.body;
  try {
    const result = await uploadService.uploadProduct(req.file.path);

    const newProduct = await prisma.product.create({
      data: {
        productImage: result,
        productType: productType,
        productName: productName,
        productDetail: productDetail,
        price: +req.body.price,
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

productController.updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const { productImage, productName, productType, productDetail, price } =
    req.body;

  try {
    const product = await prisma.product.update({
      where: { id },
      data: {
        productImage,
        productType,
        productName,
        productDetail,
        price,
      },
    });
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
  }
};

productController.deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  console.log(id, "---------------id");

  try {
    await prisma.product.delete({
      where: { id },
    });

    res.status(200).json({ message: "delete product" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "cannot delete product" });
  }
};

module.exports = productController;
