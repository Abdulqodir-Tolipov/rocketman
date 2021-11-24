const router = require('express').Router();
const controller = require('../../controllers/admin.js');

router
  .route('/admin')
  .get(controller.GET)
  .post(controller.POST)
  .put(controller.UPDATE)
  .delete(controller.DELETE);

router.route('/admin/:param').get(controller.GET);

module.exports = router;
