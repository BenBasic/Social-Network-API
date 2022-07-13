// Setting up file requirements
const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    addThought,
    updateThought,
    removeThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller')

// Routes general group related requests for getAllThoughts
router
    .route('/')
    .get(getAllThoughts)
    
// Routes for userId related requests such as addThought
router
    .route('/:userId')
    .post(addThought);

// Routes for thoughtId related requests such as getThoughtById, addThought, and removeThought
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought)

// Routes for reaction related requests (which are within Thought, hence needing thoughtId) such as addReaction, and removeReaction
router
    .route('/:thoughtId/reactions')
    .post(addReaction)
    .delete(removeReaction)

// Exports module for use in other files
module.exports = router;