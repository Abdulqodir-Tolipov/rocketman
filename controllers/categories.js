const model = require('../repositories/categories.js');
const validations = require('../validation/categories.js');

const GET = async (req, res) => {
  const category = await model.get({ ...req.params, ...req.query });
  if (category) {
    res.status(200).json(category);
  } else {
    res.status(400).json({
      status: 400,
      message: 'not found!',
      data: null,
    });
  }
};

const POST = async (req, res) => {
  try {
    let { name, tg_name, shop } = req.body;

    const validationResult = validations.addCategory.validate({
      name,
      tg_name,
      shop,
    });

    if (validationResult.error) {
      return res.status(400).send(validationResult.error.details[0].message);
    }

    const data = await model.post(req.body);

    return res.status(200).json({
      status: 200,
      message: 'The new category is added!',
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
    let { id, name, tg_name, shop, status } = req.body;

    const validationResult = validations.updateCategory.validate({
      id,
      name,
      tg_name,
      shop,
      status,
    });

    if (validationResult.error) {
      return res.status(400).send(validationResult.error.details[0].message);
    }

    const data = await model.update(req.body);

    return res.status(200).json({
      status: 200,
      message: 'The category is updated!',
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
};

const DELETE = async (req, res) => {
  try {
    let { id } = req.body;

    const validationResult = validations.deleteCategory.validate({
      id,
    });

    if (validationResult.error) {
      return res.status(400).send(validationResult.error.detials[0].message);
    }

    const data = await model.deleter(req.body);

    if (data) {
      res.status(200).json({
        status: 200,
        message: 'The category is deleted!',
        data,
      });
    }
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
