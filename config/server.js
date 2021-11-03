const dotenv = require('dotenv');

dotenv.config();

const config = {
  PORT: process.env.PORT,
  PRIVATE_KEY: process.env.PRIVATE_KEY,
};

module.exports = config;
