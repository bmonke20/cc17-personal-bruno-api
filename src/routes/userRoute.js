const express = require("express");
const authenticate = require("../middlewares/authentication");
const userController = require("../controllers/userController");
const { registerValidate, loginValidate } = require("../middlewares/validate");

const userRouter = express.Router();

userRouter.post("/register", registerValidate, userController.register);
userRouter.post("/login", loginValidate, userController.login);
userRouter.get("/me", authenticate, userController.me);

userRouter.get("/:id", authenticate, userController.getProfile);
userRouter.patch("/update", authenticate, userController.updateProfile);

module.exports = userRouter;
