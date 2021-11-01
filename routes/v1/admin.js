const router = require("express").Router();
const controller = require("../../controllers/admin.js");

router
    .route("/admin")
    .get(controller.GET)
    .post(controller.POST)
    .put(controller.UPDATE)
    .delete(controller.DELETE);

module.exports = router;
