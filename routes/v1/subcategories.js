const router = require("express").Router()
const controller = require("../../controllers/subcategories.js")
router.route('/subcategories')
    .get(controller.GET)
    .post(controller.POST)
    .put(controller.PUT)
    .delete(controller.DELETE)

module.exports = router