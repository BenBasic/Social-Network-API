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
    the reactionBody property a required property in the reactionSchema,
    the value of the reactionBody can only be a maximum of 280 characters, it can't be longer than that
    */
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    }
})