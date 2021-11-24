const router = require('express').Router();
const controller = require('../../controllers/drivers.js');

router
  .route('/drivers')
  .get(controller.GET)
  .post(controller.POST)
  .put(controller.UPDATE)
  .delete(controller.DELETE);
router.route('/drivers/:id').get(controller.GET);

module.exports = router;
