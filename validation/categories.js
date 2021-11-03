const joi = require('joi');

const addCategory = joi.object({
  name: joi.string().min(3).max(100).required(),
  tg_name: joi.string().min(3).max(100).required(),
  shop: joi.number(),
});

const updateCategory = joi.object({
  id: joi.required(),
  name: joi.string().min(3).max(100),
  tg_name: joi.string().min(8).max(100),
  shop: joi.number(),
  status: joi.string(),
});

const deleteCategory = joi.object({
  id: joi.required(),
});

module.exports = {
  addCategory,
  updateCategory,
  deleteCategory,
};
