const model = require('../repositories/comments.js');
const bot = require('../utils/bot.js');

const GET = async (req, res) => {
  const comment = await model.get();
  if (comment) {
    return res.status(200).json(comment);
  }
};

const POST = async (req, res) => {
  try {
    const { chatId, message } = req.body;
    bot.sendMessage(chatId, message);
    res.status(200).json({
      status: 200,
      message: 'sent',
      data: null,
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: error,
      data: null,
    });
  }
};

module.exports = {
  GET,
  POST,
};
