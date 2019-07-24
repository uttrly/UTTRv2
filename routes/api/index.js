const router = require("express").Router();
// const appRoutes = require("./app");
const authRoutes = require('./auth');

// API routes
// router.use("/app", appRoutes);
router.use("/auth", authRoutes);

module.exports = router;