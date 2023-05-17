const Joi = require("joi");

const paginationQueryValidation = Joi.object({
  page: Joi.string().pattern(/[0-9]/, { name: "numbers" }).min(1),
  limit: Joi.string().pattern(/[0-9]/, { name: "numbers" }).min(1),
});

module.exports = { paginationQueryValidation: paginationQueryValidation };
