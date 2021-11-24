const router = require('express').Router();
const controller = require('../../controllers/subproducts.js');

router
  .route('/subproducts')
  .get(controller.GET)
  .post(controller.POST)
  .put(controller.UPDATE)
  .delete(controller.DELETE);

router.route('/subproducts/:id').get(controller.GET);

module.exports = router;
