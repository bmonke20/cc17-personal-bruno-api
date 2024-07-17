const express = require("express");
const productController = require("../controllers/productController");
const upload = require("../middlewares/upload");

const productRouter = express.Router();

productRouter.post(
  "/",
  upload.single("productImage"),
  productController.createProduct
);

productRouter.get("/", productController.getAllProduct);

productRouter.get("/:productId", productController.getProductById);

// productRouter.patch("/:productId", productController.updateProduct);
productRouter.patch(
  "/:productId",
  upload.single("productImage"),
  productController.updateProduct
);

productRouter.delete("/:productId", productController.deleteProduct);

module.exports = productRouter;
