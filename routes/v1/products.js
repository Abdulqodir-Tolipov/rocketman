const router = require("express").Router()
const controller = require("../../controllers/products.js")

router.route('/products')
    .get(controller.GET)
    .post(controller.POST)
    .put(controller.UPDATE)
    .delete(controller.DELETE)

module.exports = router