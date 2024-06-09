const createError = require("../utils/createError");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwtService = require("../services/jwtService");

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

    const userExist = await prisma.user.findUnique({
      where: { OR: [{ username: username }, { email: email }] },
    });

    if (userExist) {
      return next(
        createError({
          message: "user already exist",
          field: "username or email",
          statusCode: 400,
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
    const { email, username, password } = req.body;

    if ((!email && !username) || !password) {
      throw createError({
        message: "insert email or username",
        statusCode: 400,
      });
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: email }, { username: username }],
      },
    });

    if (!user) {
      throw createError({ message: "Invalid credentials", statusCode: 401 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw createError({
        message: "Invalid credentials",
        statusCode: 401,
      });
    }

    const accessToken = jwtService.sign({ id: user.id });

    res.status(201).json({ message: "Login success", accessToken });
  } catch (err) {
    next(err);
  }
};

userController.me = async (req, res, next) => {
  try {
    const user = prisma.user.findUnique({ where: { id: req.user.id } });

    if (!user) {
      throw createError({ message: "user not found", statusCode: 404 });
    }
  } catch (err) {
    next(err);
  }

  res.status(200).json({ user: req.user });
};

module.exports = userController;
