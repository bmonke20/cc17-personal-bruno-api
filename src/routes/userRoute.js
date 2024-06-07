const express = require("express");
const userController = require("../controllers/userController");
const { registerValidate } = require("../middlewares/validate");

const userRouter = express.Router();

userRouter.post("/register", registerValidate, userController.register);

module.exports = userRouter;
