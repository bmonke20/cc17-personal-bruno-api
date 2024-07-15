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
cartRouter.get("/:userId", cartController.getCart);
cartRouter.post("/", cartController.addCart);
cartRouter.patch("/:cartId", cartController.updateCart);
cartRouter.delete("/:cartId", cartController.deleteCart);

module.exports = cartRouter;
