// const { PrismaClient } = require("@prisma/client");
// const uploadService = require("../services/uploadService");

// const prisma = new PrismaClient();
// const productController = {};

// productController.createProduct = async (req, res, next) => {
//   const { productImage, productType, productName, productDetail, price } =
//     req.body;

//   try {
//     const newProduct = await prisma.product.create({
//       data: {
//         productImage,
//         productType,
//         productName,
//         productDetail,
//         price: parseFloat(price),
//       },
//     });

//     res.json(newProduct);
//   } catch (error) {
//     res.status(500).json({ error: "Could not create product" });
//   }
// };

// productController.getAllProduct = async (req, res, next) => {
//   try {
//     const products = await prisma.product.findMany();
//     res.json(products);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: err.message });
//   }
// };

// productController.getProductById = async (req, res, next) => {
//   const { productId } = req.params;

//   try {
//     const product = await prisma.product.findUnique({
//       where: {
//         id: parseInt(productId),
//       },
//     });
//     if (!product) {
//       return res.status(404).json({ err: "Product not found" });
//     }
//     res.status(200).json(product);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "no fetch product" });
//   }
// };

// productController.updateProduct = async (req, res, next) => {
//   const { id } = req.params;
//   const { productImage, productType, productName, productDetail, price } =
//     req.body;

//   try {
//     const updatedProduct = await prisma.product.update({
//       where: { id: parseInt(id) },
//       data: {
//         productImage,
//         productType,
//         productName,
//         productDetail,
//         price: parseFloat(price),
//       },
//     });

//     res.json(updatedProduct);
//   } catch (error) {
//     res.status(500).json({ error: "Could not update product" });
//   }
// };

// productController.deleteProduct = async (req, res, next) => {
//   const { id } = req.params;

//   try {
//     const deletedProduct = await prisma.product.delete({
//       where: { id: parseInt(id) },
//     });

//     res.json(deletedProduct);
//   } catch (error) {
//     res.status(500).json({ error: "Could not delete product" });
//   }
// };

// module.exports = productController;

const { PrismaClient } = require("@prisma/client");
const uploadService = require("../services/uploadService");

const prisma = new PrismaClient();
const productController = {};

productController.createProduct = async (req, res, next) => {
  try {
    const { productType, productName, productDetail, productPrice } = req.body;

    const result = await uploadService.uploadProduct(req.file.path);

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
    console.log(err.message);
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
  const { productId } = req.params;
  const { productName, productType, productDetail, productPrice } = req.body;

  console.log(req.file);
  const result = await uploadService.uploadProduct(req.file.path);

  try {
    const product = await prisma.product.update({
      where: { id: +productId },
      data: {
        productImage: result,
        productType,
        productName,
        productDetail,
        price: +productPrice,
        productType: productType,
      },
    });
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

productController.deleteProduct = async (req, res, next) => {
  const { productId } = req.params;

  console.log("----", req.params);

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
