// Setting up file requirements
const { Thought, User, Types } = require('../models');

/* Gets all the thoughts from the thoughtSchema, uses Thought.find to find all documents within it,
then excludes the __v property, sorts by descending order of _id
*/
const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
        .select("-__v")
        .sort({ _id: -1 })
        .then((dbThoughtData) => res.json(dbThoughtData)) // Returning the result data as JSON Object
        .catch((err) => {
            // if there is an error, it will log an error
            console.log(err);
            res.status(400).json(err)
        })
    },
    /* Gets one of the thoughts from the thoughtSchema, uses Thought.findOne to find one document within that has a matching id parameter,
    then excludes the __v property
    */
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.thoughtId })
        .select("-__v")
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                // If there is no matching id for the Thought requested, log an error
                res.status(404).json({ message: "No thought with this id exists" });
                return;
            }
            res.json(dbThoughtData); // Returning the result data as JSON Object
        })
        .catch((err) => {
            // if there is an error, it will log an error
            console.log(err);
            res.status(400).json(err);
        });
    },
    // Creates a thought, adding it to the thoughtSchema, uses Thought.create(body) to add the body from the post request into the thoughtSchema
    addThought({ params, body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                /* Updates one of the users from the userSchema, uses User.findOneAndUpdate to find one document within that has a matching id parameter,
                then pushes the created thought into the thoughts array,
                new: true to return the modified document
                */
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    // If there is no matching id for the Thought requested, log an error
                    res.status(404).json({ message: "No User with this id exists" });
                    return;
                }
                res.json(dbUserData); // Returning the result data as JSON Object
            })
            .catch(err => res.json(err)); // if there is an error, it will log an error
    },
    
}