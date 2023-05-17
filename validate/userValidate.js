const Joi = require("joi");

const createUserValidation = Joi.object({
  user: Joi.string()
    .pattern(new RegExp("^[a-zа-яA-ZА-Я0-9]{1,16}[ a-zа-яA-ZА-Я0-9]{0,16}$"))
    .required(),
});

const updateUserValidation = Joi.object({
  user: Joi.string().pattern(
    new RegExp("^[a-zа-яA-ZА-Я0-9]{1,16}[ a-zа-яA-ZА-Я0-9]{0,16}$")
  ),
  avatar: Joi.any(),
});

module.exports = { createUserValidation, updateUserValidation };
