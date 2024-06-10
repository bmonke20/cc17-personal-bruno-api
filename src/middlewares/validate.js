const { registerSchema, loginSchema } = require("../validators/userValidator");

const registerValidate = (req, res, next) => {
  const { value, error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  req.body = value;
  next();
};

const loginValidate = (req, res, next) => {
  const { value, error } = loginSchema.validate(req.body);
  if (error) {
    console.log("validate_error", error);
    return res.status(400).json({ message: error.details[0].message });
  }
  req.body = value;
  next();
};

module.exports = { registerValidate, loginValidate };
