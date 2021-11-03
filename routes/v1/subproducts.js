const router = require('express').Router();
const controller = require('../../controllers/subproducts.js');

router
  .route('/subproducts')
  .get(controller.GET)
  .post(controller.POST)
  .put(controller.UPDATE)
  .delete(controller.DELETE);

module.exports = router;
