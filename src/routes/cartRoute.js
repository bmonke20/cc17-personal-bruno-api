const express = require("express");
const cartController = require("../controllers/cartController");

const cartRouter = express.Router();

const checkIsAdmin = (req, res, next) => {
  const isAdmin = req.user && req.user.isAdmin;
  if (!isAdmin) {
    return res.status(403).json({ error: "Unauthorized access" });
  }
  next();
};

// Routes สำหรับผู้ใช้ทั่วไป (user)
cartRouter.post("/", cartController.addToCart);
cartRouter.patch("/:cartId", cartController.createOrder);

module.exports = cartRouter;
