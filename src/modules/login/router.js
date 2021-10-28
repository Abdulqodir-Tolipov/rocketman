const router = require("express").Router()
const login = require("../login/controller.js")

router.route('/login')
    .post(login)


module.exports = router