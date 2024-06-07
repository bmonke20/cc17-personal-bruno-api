const createError = require("../utils/createError");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

const userController = {};

userController.register = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      confirmPassword,
      isAdmin,
    } = req.body;

    // if (
    //   !firstName ||
    //   !lastName ||
    //   !username ||
    //   !email ||
    //   !password ||
    //   !confirmPassword
    // ) {
    //   createError({
    //     message: "Fill all input",
    //     field: "user",
    //     statuscode: 400,
    //   });
    // }

    // if (password !== confirmPassword) {
    //   createError({
    //     message: "password do not match",
    //     field: "confirmPassword",
    //     statusCode: 400,
    //   });
    // }

    const userExist = await prisma.user.findFirst({
      where: { OR: [{ username: username }, { email: email }] },
    });

    if (userExist) {
      return next(
        createError({
          message: "user already exist",
          field: "username or email",
          statusCOde: 400,
        })
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const data = {
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
      isAdmin: isAdmin || false,
    };

    const result = await prisma.user.create({
      data: data,
    });

    console.log(result);

    res.status(201).json({ messgae: "Register success", user: result });
  } catch (err) {
    next(err);
  }
};

userController.login = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

module.exports = userController;
