const Joi = require("joi");

const registerSchema = Joi.object({
  firstName: Joi.string().required().trim(),
  lastName: Joi.string().required().trim(),
  username: Joi.string().required(),
  email: Joi.string().email({ tlds: false }),
  password: Joi.string()
    .required()
    .pattern(/^[a-zA-Z0-9]{6,}$/),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).strip(),
  isAdmin: Joi.boolean().optional(),
});

module.exports = { registerSchema };
