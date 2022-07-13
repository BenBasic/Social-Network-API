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
    /* Updates one of the thoughts from the thoughtSchema, uses Thought.findOneAndUpdate to find one document within that has a matching id parameter and update it with the body from the put request,
    new: true to return the modified document,
    runValidators: true to validate the document before updating
    */
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true, runValidators: true }
        )
            .then(updatedThought => {
                if (!updatedThought) {
                    // If there is no matching id for the Thought requested, log an error
                    return res.status(404).json({ message: 'No Thought with this id exists' });
                }
                res.json(updatedThought); // Returning the result data as JSON Object
            })
            .catch(err => res.json(err)); // if there is an error, it will log an error
    },
    // Deletes one of the thoughts from the thoughtSchema, uses Thought.findOneAndDelete to find one document within that has a matching id parameter and deletes it
    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(deletedthought => {
                if (!deletedthought) {
                    // If there is no matching id for the Thought requested, log an error
                    return res.status(404).json({ message: 'No Thought with this id exists' });
                }
                /* Updates one of the users from the userSchema, uses User.findOneAndUpdate to find one document within that has a matching id parameter,
                then pulls the selected thought from the thoughts array,
                new: true to return the modified document
                */
                return User.findOneAndUpdate(
                    { _id: params.username },
                    { $pull: { thoughts: params.thoughtId } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                res.json(dbUserData); // Returning the result data as JSON Object
            })
            .catch(err => res.json(err)); // if there is an error, it will log an error
    },
    /* Adds a reaction to the thoughtSchema, uses Thought.findOneAndUpdate to find one document within that has a matching id parameter,
    then uses $push to add the reaction body from the post request to the reactions array inside of the selected thought,
    new: true to return the modified document
    */
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true }
        )
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
    /* Removes one of the reactions from the thoughtSchema from a thought's reaction list, uses Thought.findByOneAndUpdate to find one document within that has a matching id parameter and removes it,
    then uses $pull to remove a reaction from the reactions array,
    new: true to return the modified document
    */
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then(dbUserData => res.json(dbUserData)) // Returning the result data as JSON Object
            .catch(err => res.json(err)); // if there is an error, it will log an error
    }
}

// Exports module for use in other files
module.exports = thoughtController