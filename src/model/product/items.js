const Joi = require("joi");

const productScema = Joi.object({
  productImage: Joi.string().required(),
  productType: Joi.string().valid("TOP", "BOTTOM", "ACCESSORIES").required(),
  productName: Joi.string().required(),
  productDetail: Joi.string().required(),
  price: Joi.number().required(),
});

module.exports = { productScema };
