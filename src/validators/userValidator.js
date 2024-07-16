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
  identify: Joi.string()
    .required()
    .custom((value, helpers) => {
      // Regular expression for validating email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      // Regular expression for validating username (alphanumeric and at least 3 characters)
      const usernameRegex = /^[a-zA-Z0-9]/;

      if (emailRegex.test(value) || usernameRegex.test(value)) {
        return value; // Valid identify
      } else {
        return helpers.message(
          "Identify must be a valid email or username (at least 3 alphanumeric characters)"
        );
      }
    })
    .messages({
      "string.empty": "Email or username is required",
      "any.required": "Email or username is required",
    }),
  password: Joi.string().required(),
});

module.exports = { registerSchema, loginSchema };
