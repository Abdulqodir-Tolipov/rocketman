const router = require('express').Router();
const controller = require('../../controllers/orders.js');

router.route('/orders').get(controller.GET);

module.exports = router;
