const router = require('express').Router();
const controller = require('../../controllers/comments.js');

router.route('/comments').get(controller.GET).post(controller.POST);

module.exports = router;
