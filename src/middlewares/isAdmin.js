const createError = require("../utils/createError");

const isAdmin = (req, res, next) => {
  const { isAdmin } = req.user;

  if (!isAdmin) {
    return next(
      createError({ message: "Only admin can do this", statusCode: 403 })
    );
  }
  next();
};

module.exports = isAdmin;
