// Setting up file requirements
const express = require("express");
const db = require("./config/connection");
// Initializing routes
const routes = require("./routes");

// Defining the server port
const PORT = process.env.PORT || 3001;
const app = express();

// Initializing server
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Turns on connection to database and then to the server and logs a message so the user knows they're connected
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}!`);
  });
});