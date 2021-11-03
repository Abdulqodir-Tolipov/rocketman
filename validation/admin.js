const joi = require('joi');

const login = joi.object({
  username: joi.string().min(3).max(64).required(),
  password: joi.string().min(3).max(64).required(),
});

const updateAdmin = joi.object({
  username: joi.string().min(3).max(64),
  password: joi.string().min(8).max(64),
});

const deleteAdmin = joi.object({
  id: joi.required(),
});

module.exports = {
  login,
  updateAdmin,
  deleteAdmin,
};
