const dotenv = require('dotenv');

dotenv.config();

const config = {
  HOST: process.env.PG_HOST,
  PORT: process.env.PG_PORT,
  USER: process.env.PG_USER,
  PASSWORD: process.env.PG_PASSWORD,
  DATABASE: process.env.PG_NAME,
};

module.exports = config;
