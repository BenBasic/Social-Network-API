// Setting up file requirements
const { User, Thought } = require('../models')

const userController = {
    /* Gets all the users from the userSchema, uses User.find to find all documents within it,
    then populates the thoughts path while excluding the __v property
    */
    getAllUsers(req, res) {
        User.find({})
        .populate({
            path: 'thoughts',
            select: ('-__v')
        })
        .select('-__v') // Excludes the __v property
        .then(dbUserData => res.json(dbUserData)) // Returning the result data as JSON Object
        .catch(err => {
            // if there is an error, it will log an error
            console.log(err);
            res.status(400).json(err)
        })
    },
    /* Gets one of the users from the userSchema, uses User.findOne to find one document within that has a matching id parameter,
    then populates the thoughts path while excluding the __v property
    */
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v') // Excludes the __v property
        .then((dbUserData) => {
            // If there is no matching id for the User requested, log an error
            if(!dbUserData) {
                res.status(404).json({ message: "No user with this id exists" });
                return;
            }
            res.json(dbUserData); // Returning the result data as JSON Object
        })
        .catch((err) => {
            // if there is an error, it will log an error
            console.log(err);
            res.status(400).json(err);
        })
    },
    // Creates a user, adding it to the userSchema, uses User.create(body) to add the body from the post request into the userSchema
    createUser({ body }, res) {
        User.create(body)
        .then (dbUserData => res.json(dbUserData)) // Returning the result data as JSON Object
        .catch(err => {
            // if there is an error, it will log an error
            console.log(err)
            res.status(400).json(err)
        })
    },
    /* Updates one of the users from the userSchema, uses User.findOneAndUpdate to find one document within that has a matching id parameter and update it with the body from the put request,
    new: true to return the modified document,
    runValidators: true to validate the document before updating
    */
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, {
            new: true,
            runValidators: true
        })
        .then((dbUserData) => {
            // If there is no matching id for the User requested, log an error
            if (!dbUserData) {
                res.status(404).json({ message: "No user with this id exists" });
                return;
            }
            res.json(dbUserData); // Returning the result data as JSON Object
        })
        .catch((err) => res.status(400).json(err)); // if there is an error, it will log an error
    },
    // Deletes one of the users from the userSchema, uses User.findOneAndDelete to find one document within that has a matching id parameter and deletes it
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then((dbUserData) => {
            if(!dbUserData) {
                // If there is no matching id for the User requested, log an error
                res.status(404).json({ message: "No user with this id exists" });
                return;
            }
            /* Updating many items in the userSchema,
            using $in to select the documents where the value of _id equals any value in the friends array,
            using $pull to remove all friends with matching ids (this removes the user being deleted from all friends lists)
            */
            User.updateMany(
                { _id: { $in: dbUserData.friends } },
                { $pull: { friends: { $in: params.id } } },
                console.log("Friends thing: " + dbUserData.friends),
                console.log("Params thing: " + params.id)
            )
            .then(() => {
                // Deletes all thoughts from any user with a matching username, this would delete all thoughts from the deleted user
                Thought.deleteMany({ username: dbUserData.username })
                .then(() => {
                    res.json({ message: "User is now deleted" }) // Logs a confirmation message
                })
                .catch((err) => res.status(400).json(err)); // if there is an error, it will log an error
            })
            .catch((err) => res.status(400).json(err)); // if there is an error, it will log an error
        })
        .catch((err) => res.status(400).json(err)); // if there is an error, it will log an error
    },
    /* Adds one of the users from the userSchema to a user's friend list, uses User.findByIdAndUpdate to find one document within that has a matching id parameter,
    then uses $addToSet to add a friend to the friends unless the friend is already present in the array
    */
    addFriend({ params }, res) {
        User.findByIdAndUpdate(
            { _id: params.id },
            { $addToSet: { friends: params.friendId } },
            { new: true }
        )
        .select('-__v') // Excludes the __v property
        .then((dbUserData) => {
            if(!dbUserData) {
                // If there is no matching id for the User requested, log an error
                res.status(404).json({ message: "No user with this id exists" });
                return;
            }
            res.json(dbUserData); // Returning the result data as JSON Object
        })
        .catch((err) => {
            // if there is an error, it will log an error
            res.status(400).json(err);
        })
    },
    /* Removes one of the users from the userSchema from a user's friend list, uses User.findByIdAndUpdate to find one document within that has a matching id parameter and removes it,
    then uses $pull to remove a friend from the friends array
    */
    removeFriend({ params }, res) {
        User.findByIdAndUpdate(
            { _id: params.id },
            { $pull: { friends: params.friendId } },
            { new: true, runValidators: true }
        )
        .select("-__v") // Excludes the __v property
        .then((dbUserData) => {
            if (!dbUserData) {
                // If there is no matching id for the User requested, log an error
                res.status(404).json({ message: "No friend with this id exists" });
                return;
            }
            res.json(dbUserData); // Returning the result data as JSON Object
        })
        .catch((err) => res.status(400).json(err)); // if there is an error, it will log an error
    }
}

// Exports module for use in other files
module.exports = userController