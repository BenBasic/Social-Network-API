// Setting up file requirements
const router = require("express").Router();
const apiRoutes = require("./api");

// Initializing routes
router.use("/api", apiRoutes);

// Exports module for use in other files
module.exports = router;