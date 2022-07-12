// Setting up file requirements
const { Schema, model, Types } = require('mongoose');

const reactionSchema = new Schema ({
    /* Setting the type to the ObjectId of the current schema which is Thought,
    then defining default value for paths to be a newly generated ObjectId (this would be used in the same way we'd use a .get findOne with an id, example: api/thoughts/whatever the ObjectId is)
    */
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    /* Making the reactionBody require a string value,
    the reactionBody property is a required property in the reactionSchema,
    the value of the reactionBody can only be a maximum of 280 characters, it can't be longer than that
    */
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    /* Making the username require a string value,
    the username property is a required property in the reactionSchema,
    */
    username: {
        type: String,
        required: true
    },
    /* Making the createdAt require a date value,
    the default value for the paths will be the value generated from the Date.now method which creates a Number representing the milliseconds elapsed since the UNIX epoch (example: 1519211809934)
    */
    createdAt: {
        type: Date,
        default: Date.now
    }
})