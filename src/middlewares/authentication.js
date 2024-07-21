const { PrismaClient } = require("@prisma/client");
const jwtService = require("../services/jwtService");
const createError = require("../utils/createError");

const prisma = new PrismaClient();

const authenticate = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    // console.log(authorization, "token__________");
    if (!authorization || !authorization.startsWith(`Bearer `)) {
      createError({
        message: "unauthen",
        statusCode: 401,
      });
    }

    const accessToken = authorization.split(" ")[1];
    const payload = jwtService.verify(accessToken);

    if (!payload) {
      throw createError({ message: "Invalid Token", statusCode: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: payload.id,
      },
    });

    if (!user) {
      throw createError({ message: "User not Found", statusCode: 404 });
    }

    req.user = user;

    if (user.isAdmin) {
      req.user.isAdmin = true;
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authenticate;
