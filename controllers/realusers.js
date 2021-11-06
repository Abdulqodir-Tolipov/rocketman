const model = require('../repositories/realusers.js');

const GET = async (req, res) => {
  const realusers = await model.get(req.params);
  if (realusers) {
    res.status(200).json(realusers);
  } else {
    res.status(400).json({
      status: 400,
      message: 'not found!',
      data: null,
    });
  }
};

module.exports = { GET };
