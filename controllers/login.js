const model = require('../repositories/login.js');
const validations = require('../validation/admin.js');
const jwt = require('../utils/jwt.js');

const login = async (req, res) => {
  try {
    let { username, password } = req.body;

    const validationResult = validations.login.validate({
      username,
      password,
    });

    if (validationResult.error) {
      return res.status(400).send(validationResult.error.details[0].message);
    }

    const logged = await model.login(req.body);
    if (logged && logged.status != 'deleted') {
      const token = jwt.sign(logged.status);
      res.cookie('token', token);
      res.status(200).json({
        status: 200,
        message: 'You are logged in!',
        token,
      });
    } else throw new Error('Wrong password or username!');
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
      token: null,
    });
  }
};

module.exports = login;
