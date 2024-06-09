const Joi = require("joi");

const registerSchema = Joi.object({
  firstName: Joi.string().required().trim(),
  lastName: Joi.string().required().trim(),
  username: Joi.string().required().trim(),
  email: Joi.string().required().email({ tlds: false }),
  password: Joi.string()
    .required()
    .pattern(/^[a-zA-Z0-9]{6,}$/),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).strip(),
  isAdmin: Joi.boolean().optional(),
});

const loginSchema = Joi.object({
  email: Joi.string().optional(),
  username: Joi.string().optional(),
  password: Joi.string().required(),
}).xor("email", "username");

module.exports = { registerSchema, loginSchema };
