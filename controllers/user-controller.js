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
}