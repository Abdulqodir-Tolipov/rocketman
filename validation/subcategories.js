const joi = require('joi');

const addSubcategories = joi.object({
  name: joi.string().max(200).required(),
  amount: joi.number(),
  contact: joi.string().max(12).required(),
  address: joi.string().min(5).max(250).required(),
  category_id: joi.number().required(),
});

const putSubCategories = joi.object({
  id: joi.required(),
  name: joi.string().max(200),
  amount: joi.number(),
  contact: joi.string().max(12),
  address: joi.string().min(5).max(250),
  status: joi.string().max(200),
  category_id: joi.number(),
});

const deletSubCategories = joi.object({
  id: joi.required(),
});
module.exports = {
  addSubcategories,
  putSubCategories,
  deletSubCategories,
};