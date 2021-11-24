const router = require('express').Router();
const controller = require('../../controllers/realusers.js');

router.route('/realusers').get(controller.GET);

router.route('/realusers/:param').get(controller.GET);

module.exports = router;
