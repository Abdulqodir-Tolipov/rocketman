const joi = require('joi');

const addProduct = joi.object({
  name: joi.string().min(3).max(100).required(),
  tg_name: joi.string().min(3).max(100).required(),
  amount: joi.number(),
  sub_categories_id: joi.number().required(),
});

const updateProduct = joi.object({
  id: joi.required(),
  name: joi.string().min(3).max(100),
  tg_name: joi.string().min(3).max(100),
  amount: joi.number(),
  status: joi.string(),
  sub_categories_id: joi.number(),
});

const deleteProduct = joi.object({
  id: joi.required(),
});

module.exports = {
  addProduct,
  updateProduct,
  deleteProduct,
};
