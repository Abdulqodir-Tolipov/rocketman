const Joi = require('joi');

const addSubProduct = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  info: Joi.string().min(2).max(200).required(),
  price: Joi.number().min(1000).max(1000000).required(),
  img_link: Joi.string().uri().required(),
  product_id: Joi.number().min(1).required(),
});
const deleteSubProduct = Joi.object({
  id: Joi.number().min(1).required(),
});
const updateSubProduct = Joi.object({
  id: Joi.number().min(1).required(),
  name: Joi.string().min(2).max(100),
  info: Joi.string().min(2).max(200),
  price: Joi.number().min(1000).max(1000000),
  img_link: Joi.string().uri(),
  status: Joi.string(),
  product_id: Joi.number().min(1),
});
module.exports = {
  addSubProduct,
  deleteSubProduct,
  updateSubProduct,
};
