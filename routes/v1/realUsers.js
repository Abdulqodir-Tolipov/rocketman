const router = require("express").Router()
const controller = require("../../controllers/realUsers.js")

router.route("/realusers")
    .get(controller.GET)

module.exports = router