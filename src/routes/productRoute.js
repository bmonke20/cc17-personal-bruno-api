const express = require("express");
const productController = require("../controllers/productController");
const upload = require("../middlewares/upload");

const productRouter = express.Router();

productRouter.post(
  "/:productType",
  upload.single("productImage"),
  productController.createProduct
);

productRouter.get("/", productController.getAllProduct);

productRouter.get("/:id", productController.getProductById);

productRouter.put(
  "/:id",
  upload.single("productImage"),
  productController.updateProduct
);

productRouter.delete("/:id", productController.deleteProduct);

module.exports = productRouter;
