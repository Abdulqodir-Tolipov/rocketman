const joi = require('joi');

const addDriver = joi.object({
  fullname: joi.string().min(3).max(100).required(),
  birthday: joi.string().max(12).required(),
  contact: joi.string().max(12).required(),
  car_number: joi.string().min(7).max(12).required(),
  car_name: joi.string().min(3).max(64).required(),
});

const updateDriver = joi.object({
  id: joi.required(),
  fullname: joi.string().min(3).max(100),
  birthday: joi.string().max(12),
  contact: joi.string().min(12).max(12),
  car_number: joi.string().min(7).max(12),
  car_name: joi.string().min(3).max(64),
  status: joi.string(),
});

const deleteDriver = joi.object({
  id: joi.required(),
});

module.exports = {
  addDriver,
  updateDriver,
  deleteDriver,
};
