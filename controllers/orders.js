const model = require('../repositories/orders.js');

const GET = async (req, res) => {
  const orders = await model.get();
  if (orders) {
    res.status(200).json(orders);
  } else {
    res.status(400).json({
      status: 400,
      message: 'not found!',
      data: null,
    });
  }
};

module.exports = {
  GET,
};
