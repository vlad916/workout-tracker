const express = require('express');
const logger = require ('morgan');
const mongoose = require ('mongoose');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

require('./routes/api-routes.js')(app);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { 
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.listen(PORT, () => console.log (`Server listening on PORT ${PORT}`));