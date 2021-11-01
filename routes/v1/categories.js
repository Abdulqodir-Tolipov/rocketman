const router = require("express").Router()
const controller = require("../../controllers/categories.js")

router.route('/categories')
    .get(controller.GET)
    .post(controller.POST)
    .put(controller.UPDATE)
    .delete(controller.DELETE)

module.exports = router