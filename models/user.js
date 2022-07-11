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

})