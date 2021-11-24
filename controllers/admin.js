const model = require('../repositories/admin.js');
const validations = require('../validation/admin.js');
const jwt = require('../utils/jwt.js');

const GET = async (req, res) => {
  try {
    const admins = await model.get(req.params);
    const isAdmin = jwt.verify(req.cookies.token);
    if (isAdmin == 'superadmin') {
      if (admins) {
        res.status(200).json(admins);
      } else throw new Error('Admin is not found!');
    } else throw new Error('You are not superadmin!');
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
      data: null,
    });
  }
};

const POST = async (req, res) => {
  try {
    let { username, password } = req.body;

    const validationResult = validations.login.validate({
      username,
      password,
    });

    if (validationResult.error) {
      return res.status(400).send(validationResult.error.details[0].message);
    }

    const isAdmin = jwt.verify(req.cookies.token);
    if (isAdmin == 'superadmin') {
      const data = await model.post(req.body);

      return res.status(200).json({
        status: 200,
        message: 'The new admin is added!',
        data,
      });
    } else throw new Error('You are not superuser!');
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
      data: null,
    });
  }
};

const UPDATE = async (req, res) => {
  try {
    let { username, password } = req.body;

    const validationResult = validations.updateAdmin.validate({
      username,
      password,
    });

    if (validationResult.error) {
      return res.status(400).send(validationResult.error.details[0].message);
    }

    const isAdmin = jwt.verify(req.cookies.token);
    if (isAdmin == 'superadmin') {
      const data = await model.update(req.body);

      return res.status(200).json({
        status: 200,
        message: 'The admin is updated!',
        data,
      });
    } else throw new Error('You are not superadmin!');
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
      data: null,
    });
  }
};

const DELETE = async (req, res) => {
  try {
    const isAdmin = jwt.verify(req.cookies.token);
    if (isAdmin == 'superadmin') {
      const data = await model.deleter(req.body);

      if (data) {
        res.status(200).json({
          status: 200,
          message: 'The admin is deleted!',
          data,
        });
      }
    } else throw new Error('You are not superadmin!');
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
      data: null,
    });
  }
};

module.exports = {
  GET,
  POST,
  UPDATE,
  DELETE,
};
