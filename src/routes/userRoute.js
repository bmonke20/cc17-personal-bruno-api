const express = require("express");
const userController = require("../controllers/userController");
const authenticate = require("../middlewares/authentication");
const { registerValidate, loginValidate } = require("../middlewares/validate");

const userRouter = express.Router();

userRouter.post("/register", registerValidate, userController.register);
userRouter.post("/login", loginValidate, userController.login);
userRouter.get("/me", authenticate, userController.me);

module.exports = userRouter;
