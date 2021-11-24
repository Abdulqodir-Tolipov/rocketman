const model = require('../repositories/subcategories.js');
const validations = require('../validation/subcategories.js');

const GET = async (req, res) => {
  const subcategories = await model.get(req.params, req.query);
  if (subcategories) {
    res.status(200).json(subcategories);
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
    let { name, amount, contact, address, category_id } = req.body;

    const validateResult = validations.addSubcategories.validate({
      name,
      amount,
      contact,
      address,
      category_id,
    });

    if (validateResult.error) {
      return res.status(400).send(validateResult.error.details[0].message);
    }

    const data = await model.post(req.body);

    return res.status(200).json({
      status: 200,
      message: 'The new subcategory is added',
      data,
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: error.message,
      data: null,
    });
  }
};

const PUT = async (req, res) => {
  try {
    let { id, name, amount, contact, address, status, category_id } = req.body;

    const validateResult = validations.putSubCategories.validate({
      id,
      name,
      amount,
      contact,
      address,
      status,
      category_id,
    });

    if (validateResult.error) {
      return res.status(400).send(validateResult.error.details[0].message);
    }

    const data = await model.put(req.body);

    return res.status(200).json({
      status: 200,
      message: 'The subcategory is updated',
      data,
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: error.message,
      data: null,
    });
  }
};

const DELETE = async (req, res) => {
  try {
    let { id } = req.body;
    const validateResult = validations.deletSubCategories.validate({
      id,
    });
    if (validateResult.error) {
      return res.status(400).send(validateResult.error.details[0].message);
    }

    const data = await model.deleted(req.body);

    return res.status(200).json({
      status: 200,
      message: 'The subcategory is deleted',
      data,
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: error.message,
      data: null,
    });
  }
};

module.exports = {
  GET,
  POST,
  PUT,
  DELETE,
};