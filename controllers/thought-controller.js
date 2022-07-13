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
                // If there is no matching id for the User requested, log an error
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
}