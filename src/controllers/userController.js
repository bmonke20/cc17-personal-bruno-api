const createError = require("../utils/createError");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwtService = require("../services/jwtService");

const prisma = new PrismaClient();

const userController = {};

userController.register = async (req, res, next) => {
  try {
    const { firstName, lastName, username, email, password, isAdmin } =
      req.body;

    const userExist = await prisma.user.findFirst({
      where: {
        OR: [{ username: username }, { email: email }],
      },
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
    // console.log("Hashed password:", hashedPassword);

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

    res.status(201).json({ messgae: "Register success", user: result });
  } catch (err) {
    next(err);
  }
};

userController.login = async (req, res, next) => {
  try {
    const { identify, password } = req.body;

    if (!identify || !password) {
      throw createError({
        message: "insert email or username",
        statusCode: 400,
      });
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: identify }, { username: identify }],
      },
    });

    if (!user) {
      throw createError({
        message: "Invalid credentials 1",
        statusCode: 401,
      });
    }

    // console.log("User password from DB:", user.password);
    // console.log("Provided password:", password);

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw createError({
        message: "Invalid credentials 2",
        statusCode: 401,
      });
    }

    const accessToken = jwtService.sign({ id: user.id });
    const redirectUrl = "/";

    res
      .status(201)
      .json({ message: "Login success", accessToken, redirectUrl });
  } catch (err) {
    console.error(err);
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

userController.getProfile = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return createError({ message: "user not found", statusCode: 404 });
    }
    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};

userController.updateProfile = async (req, res, next) => {
  const { firstName, lastName, username, email, password } = req.body;

  try {
    const data = {};

    if (firstName) data.firstName = firstName;
    if (lastName) data.lastName = lastName;
    if (username) data.username = username;
    if (email) data.email = email;
    if (password) data.password = await bcrypt.hash(password, 10); // hash password ก่อนบันทึกลงฐานข้อมูล

    const user = await prisma.user.update({
      where: { id: req.user.id },
      data,
    });

    res.status(200).json({ message: "Profile update", user });
  } catch (err) {
    next(err);
  }
};

module.exports = userController;
