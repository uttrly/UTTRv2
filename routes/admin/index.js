const router = require("express").Router();
const busDBRoutes = require("./busDb");

// Book routes
router.use("/busDb", busDBRoutes);

module.exports = router;
