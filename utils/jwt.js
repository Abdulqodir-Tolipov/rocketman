const JWT = require('jsonwebtoken');
const { PRIVATE_KEY } = require('../config/server.js');

module.exports = {
  sign: (payload) => JWT.sign(payload, PRIVATE_KEY),
  verify: (token) => JWT.verify(token, PRIVATE_KEY),
};
