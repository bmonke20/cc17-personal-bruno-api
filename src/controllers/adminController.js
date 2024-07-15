const createError = require("../utils/createError");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwtService = require("../services/jwtService");

const prisma = new PrismaClient();

const adminController = {};

adminController.login = async (req, res, next) => {
  try {
    const { identify, password } = req.body;
    if (!identify || !password) {
      throw createError({
        message: "insert email or username",
        statusCode: 400,
      });
    }

    const admin = await prisma.user.findFirst({
      where: {
        AND: [
          { isAdmin: true },
          { OR: [{ email: identify }, { username: identify }] },
        ],
      },
    });

    if (!admin) {
      throw createError({ message: "Invalid credentials", statusCode: 401 });
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      throw createError({
        message: "Invalid credentials",
        statusCode: 401,
      });
    }

    const accessToken = jwtService.sign({ id: admin.id });
    const redirectUrl = "/admin";

    res
      .status(201)
      .json({ message: "Login success", accessToken, redirectUrl });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

adminController.register = async (req, res, next) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;

    const adminExist = await prisma.user.findFirst({
      where: {
        OR: [
          { username: { contains: "admin" } },
          { email: { contains: "admin" } },
        ],
      },
    });

    if (adminExist) {
      throw createError({
        message: "Username or email already exists",
        statusCode: 400,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const data = {
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
      isAdmin: true,
    };

    const result = await prisma.user.create({
      data: data,
    });

    res.status(201).json({ messgae: "Register success", user: result });
  } catch (err) {
    next(err);
  }
};

adminController.me = async (req, res, next) => {
  try {
    // Get the admin user from the database using the req.user.id
    const admin = await prisma.user.findUnique({
      where: { id: req.user.id },
    });

    if (!admin) {
      throw createError({ message: "Admin not found", statusCode: 404 });
    }

    res.status(200).json({ admin });
  } catch (err) {
    next(err);
  }
};

module.exports = adminController;
