// Setting up file requirements
const router = require('express').Router();
const{
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/user-controller')

// Routes general group related requests for getAllUsers and createUser
router
    .route('/')
    .get(getAllUsers)
    .post(createUser)

// Routes for id related requests such as getUserById, deleteUser and updateUser
router
    .route('/:id')
    .get(getUserById)
    .delete(deleteUser)
    .put(updateUser)

// Routes for friendId related requests such as addFriend, and removeFriend
router
    .route("/:id/friends/:friendId")
    .post(addFriend)
    .delete(removeFriend);


// Exports module for use in other files
module.exports = router;