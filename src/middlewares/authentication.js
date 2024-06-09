const { PrismaClient } = require("@prisma/client");
const jwtService = require("../services/jwtService");
const createError = require("../utils/createError");

const prisma = new PrismaClient();

const authenticate = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith(`Bearer `)) {
      return createError({
        message: "unauthen",
        statusCode: 401,
      });
    }

    const accessToken = authorization.split(" ")[1];
    const payload = jwtService.verify(accessToken);

    const user = await prisma.user.findFirst({
      where: { id: payload.userId },
    });

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authenticate;
