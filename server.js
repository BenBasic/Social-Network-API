// Setting up file requirements
const express = require('express');
const mongoose = require('mongoose')
const app = express();

// Defining the server port
const PORT = process.env.PORT || 3001;

// Initializing server
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Initializing routes
app.use(require('./routes'));

// Initializing the session
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/pizza-hunt', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// This will to log mongo queries being executed
mongoose.set('debug', true);

// Turns on connection to database and then to the server and logs a message so the user knows they're connected
app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));