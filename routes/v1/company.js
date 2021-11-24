const router = require('express').Router();
const controller = require('../../controllers/company.js');

router.route('/company').put(controller.UPDATE);

module.exports = router;
