const router = require("express").Router();
const appController = require("../../controllers/appController");

// Matches with "/api/app/search/:route/:origin/:destination/:terminal/:previous"
router.route("/dashboard")
    .get(appController.dashboard)

router.route("/challenge")
    .get(appController.challenge)

router.route("/newChallenge")
    .post(appController.newChallenge)

router.route("/comment")
    .post(appController.addComment)

router.route("/report")
    .post(appController.report)

module.exports = router;
