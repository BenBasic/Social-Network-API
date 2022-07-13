// Setting up file requirements
const { Schema, model, Types } = require('mongoose');
const moment = require("moment");

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
        maxlength: 280
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
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    }
},
{
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    /* Using the toJSON schema option to use a JSON for the MongoDB query,
    setting getters: true to allow .get use of the data for the schema, I believe this is the default behavior of JSON within MongoDB but I figure it doesn't hurt to include it just in case
    */
    toJSON: {
        getters: true
    }
});

const thoughtSchema = new Schema({
    /* Making the thoughtText require a string value,
    the thoughtText property is a required property in the thoughtSchema,
    the value of the thoughtText can only be a maximum of 280 characters, it can't be longer than that
    */
    thoughtText: {
        type: String,
        required: true,
        maxlength: 280
    },
    /* Making the createdAt require a date value,
    the default value for the paths will be the value generated from the Date.now method which creates a Number representing the milliseconds elapsed since the UNIX epoch (example: 1519211809934)
    */
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
    /* Making the username require a string value,
    the username property is a required property in the thoughtSchema,
    */
    username: {
        type: String,
        required: true
    },
    // Assigning reactions property to be an array of documents from the reactionSchema
    reactions: [reactionSchema]
},
{
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    /* Using the toJSON schema option to use a JSON for the MongoDB query,
    setting virtuals: true to tell the program we want virtuals to be included with our response, overriding the default behavior,
    setting getters: true to allow .get use of the data for the schema, I believe this is the default behavior of JSON within MongoDB but I figure it doesn't hurt to include it just in case,
    setting id: false to exclude it from getting the id property
    */
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

// Gets a total count of reactions for the thought's reaction list, uses a virtual to create a reactionCount property on the document for this to work
thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
});

// Creates the Thought model using thoughtSchema
const Thought = model("Thought", thoughtSchema);

// Exports module for use in other files
module.exports = Thought;