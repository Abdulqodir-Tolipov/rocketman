const model = require('../repositories/company.js');
const jwt = require('../utils/jwt.js');

const UPDATE = async (req, res) => {
  try {
    const isAdmin = jwt.verify(req.cookies.token);
    if (isAdmin == 'superadmin') {
      const data = await model.update(req.body);
      return res.status(200).json({
        status: 200,
        message: 'The company information is updated!',
        data,
      });
    } else throw new Error('You are not superadmin!');
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
};

module.exports = { UPDATE };
