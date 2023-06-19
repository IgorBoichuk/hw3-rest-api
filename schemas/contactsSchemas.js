const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "any.required": `"Name" is a required field ` }),
  email: Joi.string().email().required().messages({
    "any.required": `"Email" is a required field`,
    "string.email": "Email must be a valid email",
  }),
  phone: Joi.string()
    .length(11)
    .pattern(/^\d{3}-\d{3}-\d{3}$/)
    .required()
    .messages({
      "any.required": `"Phone" is a required field`,
      "string.pattern.base": "phone number should be in `xxx-xxx-xxx` format",
      "string.length": "Phone length must be 11 characters long",
    }),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  addSchema,
  updateFavoriteSchema,
};
