const { PrismaClient } = require("@prisma/client");
const uploadService = require("../services/uploadService");

const prisma = new PrismaClient();
const productController = {};

// เพิ่มcheck admin
productController.createProduct = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return res
        .status(403)
        .json({ error: "Access denied. User is not admin." });
    }

    const { productType, productName, productDetail, productPrice } = req.body;

    const result = await uploadService.upload(req.file.path);

    const newProduct = await prisma.product.create({
      data: {
        productImage: result,
        productType: productType,
        productName: productName,
        productDetail: productDetail,
        price: +productPrice,
      },
    });

    res.status(200).json(newProduct);
  } catch (err) {
    next(err);
    // console.log(err.message);
  }
};

productController.getAllProduct = async (req, res, next) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (err) {
    next(err);
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
    next(err);
  }
};

productController.updateProduct = async (req, res, next) => {
  const { productId } = req.params;

  if (!req.user.isAdmin) {
    return res.status(403).json({ error: "Access denied. User is not admin." });
  }

  req.body.price = +req.body.productPrice;
  delete req.body.productPrice;

  // console.log("req body00000000000", req.body);

  // console.log(req.file);

  if (req.file) {
    const result = await uploadService.upload(req.file.path);
    req.body.productImage = result;
  }

  try {
    const product = await prisma.product.update({
      where: { id: +productId },
      data: req.body,
    });
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

productController.deleteProduct = async (req, res, next) => {
  const { productId } = req.params;

  if (!req.user.isAdmin) {
    return res.status(403).json({ error: "Access denied. User is not admin." });
  }

  try {
    await prisma.product.delete({
      where: { id: +productId },
    });

    res.status(200).json({ message: "delete product" });
  } catch (err) {
    next(err);
  }
};

module.exports = productController;
