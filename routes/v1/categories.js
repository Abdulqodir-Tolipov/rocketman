const router = require('express').Router();
const controller = require('../../controllers/categories.js');

router
  .route('/categories')
  .get(controller.GET)
  .post(controller.POST)
  .put(controller.UPDATE)
  .delete(controller.DELETE);

router.route('/categories/:param').get(controller.GET);

module.exports = router;
