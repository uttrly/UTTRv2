const router = require("express").Router();
const authController = require('../../controllers/authController');
const appController = require('../../controllers/appController');

// Matches with "/api/auth/signin"
router.route("/signin")
  .post(authController.signin)

// Matches with "/api/auth/signup"
router.route("/signup")
  .post(authController.signup)

// Match with "/api/auth/user"
router.route("/user")
  .get(authController.findUser)
//   .post(authController.updateUser)
//   .delete(authController.deleteUser)

// router.route("/createGoal")
// .get(authController.createGoal)

// router.route("/api/challenge",)
// .post(appController.newChallenge)


module.exports = router;