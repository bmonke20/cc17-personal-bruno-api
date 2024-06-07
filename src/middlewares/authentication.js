const createError = require("../utils/createError");

const authenticate = async (req, res, next) => {
  try {
    const authorization = req.header.authorization;
    if (!authorization || authorization.startWidth(`Bearer `)) {
      createError({
        message: "unauthen",
        statusCode: 401,
      });
    }

    if (!user) {
      createError({
        message: "user not found",
        statusCode: 400,
      });
    }

    delete user.password;

    req.user.password;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authenticate;
