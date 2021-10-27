const router = require("express").Router()
const controller = require("./controller")

router.route("/admin")
    .get(controller.Get)

module.exports = router