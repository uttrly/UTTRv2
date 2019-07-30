const router = require("express").Router();
const appController = require("../../controllers/appController");

// Matches with "/api/app/search/:route/:origin/:destination/:terminal/:previous"
router.route("/dashboard")
.get(appController.dashboard)

module.exports = router;
