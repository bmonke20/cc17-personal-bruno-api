const { PrismaClient } = require("@prisma/client");
const jwtService = require("../services/jwtService");
const createError = require("../utils/createError");

const prisma = new PrismaClient();

const authenticate = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    console.log(authorization, "token__________");
    if (!authorization || !authorization.startsWith(`Bearer `)) {
      createError({
        message: "unauthen",
        statusCode: 401,
      });
    }

    const accessToken = authorization.split(" ")[1];
    const payload = jwtService.verify(accessToken);

    console.log(payload, "________payload");

    const user = await prisma.user.findUnique({
      where: {
        id: payload.id,
      },
    });

    console.log(user, "________user");
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authenticate;
