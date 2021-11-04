const model = require('../repositories/drivers.js');
const validations = require('../validation/drivers.js');

const GET = async (req, res) => {
  const driver = await model.get(req.params);
  if (driver) {
    res.status(200).json(driver);
  } else {
    res.status(400).json({
      status: 400,
      message: 'not found',
      data: null,
    });
  }
};

const POST = async (req, res) => {
  try {
    let { fullname, birthday, contact, car_number, car_name } = req.body;

    const validationResult = validations.addDriver.validate({
      fullname,
      birthday,
      contact,
      car_number,
      car_name,
    });

    if (validationResult.error) {
      return res.status(400).send(validationResult.error.details[0].message);
    }

    const data = await model.post(req.body);

    return res.status(200).json({
      status: 200,
      message: 'The new driver added !',
      data,
    });
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
    let { id, fullname, birthday, contact, car_number, car_name, status } =
      req.body;

    const validationResult = validations.updateDriver.validate({
      id,
      fullname,
      birthday,
      contact,
      car_number,
      car_name,
      status,
    });

    if (validationResult.error) {
      return res.status(400).send(validationResult.error.detials[0].message);
    }

    const data = await model.update(req.body);

    return res.status(200).json({
      status: 200,
      message: 'The driver has been updated !',
      data,
    });
  } catch (error) {
    res.status(200).json({
      status: 400,
      message: error.message,
      data: null,
    });
  }
};

const DELETE = async (req, res) => {
  try {
    let { id } = req.body;

    const validationResult = validations.deleteDriver.validate({
      id,
    });

    if (validationResult.error) {
      return res.status(400).send(validationResult.error.detials[0].message);
    }
    const data = await model.deleter(req.body);

    if (data) {
      res.status(200).json({
        status: 200,
        message: 'The driver has been deleted !',
        data,
      });
    }
  } catch (error) {
    console.log(error);
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
