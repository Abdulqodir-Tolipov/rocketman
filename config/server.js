const dotenv = require('dotenv');

dotenv.config();

const config = {
  PORT: process.env.PORT || 4000,
  PRIVATE_KEY: process.env.PRIVATE_KEY,
};

module.exports = config;
