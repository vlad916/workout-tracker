const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');


// Sets up port for the server
const PORT = process.env.PORT || 5000;

const app = express();

// middleware
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Requires the routes for the app to load
app.use(require('./routes/api-routes.js'));

// Mongodb connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Starts the server
app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));