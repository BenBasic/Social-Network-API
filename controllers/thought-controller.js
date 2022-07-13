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
    
}