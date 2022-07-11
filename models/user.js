// Setting up file requirements
const { Schema, model} = require('mongoose');

const userSchema = new Schema({
        /* Making the username require a string value,
        the username property a required property in the userSchema,
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

})