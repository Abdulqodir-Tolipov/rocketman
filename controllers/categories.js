const model = require('../repositories/categories.js');
const validations = require('../validation/categories.js');

const GET = async (req, res) => {
  const category = await model.get();
  if (category) {
    res.status(200).json(category);
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
<<<<<<< HEAD
    try {
        let { name, tg_name, shop } = req.body;

        const validationResult = validations.updateCategory.validate({
            name,
            tg_name,
            shop
        });

        if (validationResult.error) {
            return res
                .status(400)
                .send(validationResult.error.details[0].message);
        }

        const data = await model.update(req.body);

        return res.status(200).json({
            status: 200,
            message: "The category is updated!",
            data,
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message,
        });
=======
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
>>>>>>> 32a70326f0ef35e73d19e0651ffc4c2e3bc8f97e
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
<<<<<<< HEAD
    try {
        const data = await model.deleter(req.body);
        console.log(data);

        if (data) {
            res.status(200).json({
                status: 200,    
                message: "The category is deleted!",
                data,
            });
        }
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message,
            data: null
        });
=======
  try {
    const data = await model.deleter(req.body);

    if (data) {
      res.status(200).json({
        status: 200,
        message: 'The category is deleted!',
        data,
      });
>>>>>>> 32a70326f0ef35e73d19e0651ffc4c2e3bc8f97e
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
