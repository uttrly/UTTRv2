const router = require("express").Router();
const adminController = require("../../controllers/adminController");

// Matches with "/admin/busDb/routes"
router.route("/routes")
  .get(adminController.createAllRoutes)

module.exports = router;
