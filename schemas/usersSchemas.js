const Joi = require("joi");

const validRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const signUpSchema = Joi.object({
  name: Joi.string().messages({
    "any.required": `"Name" is a required field `,
  }),
  email: Joi.string().pattern(validRegex).required().messages({
    "any.required": `"Email" is a required field`,
    "string.email": "Email must be a valid email",
  }),
  subscription: Joi.string().valid("starter", "pro", "business"),
  password: Joi.string().min(6).required().messages({
    "any.required": `password is required`,
    "string.length": "password length must be at least 6 characters long",
  }),
});

const signInSchema = Joi.object({
  email: Joi.string().pattern(validRegex).required().messages({
    "any.required": `"Email" is a required field`,
    "string.email": "Email must be a valid email",
  }),
  password: Joi.string().min(6).required().messages({
    "any.required": `password`,
    "string.length": "password length must be at least 6 characters long",
  }),
});

const userEmailSchema = Joi.object({
  email: Joi.string().pattern(validRegex).required().messages({
    "string.email": "Email must be a valid email",
  }),
});

module.exports = {
  signUpSchema,
  signInSchema,
  userEmailSchema,
};
