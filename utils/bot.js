const Telegrambot = require('node-telegram-bot-api');
require('dotenv').config();
const TOKEN = process.env.CLIENT_TOKEN;
const bot = new Telegrambot(TOKEN);
module.exports = bot;
