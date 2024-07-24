const express = require("express");
const productController = require("../controllers/productController");
const upload = require("../middlewares/upload");
const authenticate = require("../middlewares/authentication");

const productRouter = express.Router();

productRouter.post(
  "/",
  upload.single("productImage"),
  authenticate,
  productController.createProduct
);

productRouter.get("/", productController.getAllProduct);

productRouter.get("/:productId", productController.getProductById);

productRouter.patch(
  "/:productId",
  upload.single("productImage"),
  authenticate,
  productController.updateProduct
);

productRouter.delete(
  "/:productId",
  authenticate,
  productController.deleteProduct
);

module.exports = productRouter;
