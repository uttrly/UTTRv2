const router = require("express").Router();
const authController = require('../../controllers/authController')

// Matches with "/api/auth/singin"
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

module.exports = router;