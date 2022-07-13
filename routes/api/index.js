// Setting up file requirements
const router = require('express').Router();
const thoughtRoutes = require('./thought-routes');
const userRoutes = require('./user-routes');

// Initializing routes
router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

// Exports module for use in other files
module.exports = router;