// Setting up file requirements
const { Schema, model} = require('mongoose');

const userSchema = new Schema({
        /* Making the username require a string value,
        the username property is a required property in the userSchema,
        the username has to be unique so 2 users cant share the same username,
        and trim: true so that blank values get trimmed (example: " username", "username ")
        */
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        /* Same as above but also using a match to validate the email address using a regex,
        the regex is basically performing a check on the format and appropriate characters that would be in a standard email address,
        first checking for characters a-z, 0-9, _.-, then @, then digit characters (0-9), a-z, .-, then . then a-z, .,
        this would roughly translate into the typical email format of something@something.com
        */
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please enter a valid email address']
        },
        /* Setting the type to the ObjectId of the referred schema, in this case Thought.
        Basically, this will populate the thoughts property with an array of ObjectIds, making it contain the thoughts connected to the user associated
        */
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],
        /* Setting the type to the ObjectId of the referred schema, in this case User.
        Basically, this will populate the friends property with an array of ObjectIds, making it contain the friends connected to the user associated
        */
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    /* Using the toJSON schema option to use a JSON for the MongoDB query,
    setting virtuals: true to tell the program we want virtuals to be included with our response, overriding the default behavior,
    setting getters: true to allow .get use of the data for the schema, I believe this is the default behavior of JSON within MongoDB but I figure it doesn't hurt to include it just in case,
    setting id: false to exclude it from getting the id property
    */
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// Gets a total count of friends for the user's friends list, uses a virtual to create a friendCount property on the document for this to work
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// Creates the User model using userSchema
const User = model('User', userSchema);

// Exports module for use in other files
module.exports = User;