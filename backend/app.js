const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const feedRoutes = require('./routes/feed');
const path = require("path");

const app = express();
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

const MONGODB_URI = 'mongodb+srv://andrei:R9LeoQS78jgS0g04@nodejscompletecourseclu.xgbdg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/feed', feedRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({ message: message});
});

mongoose.connect(MONGODB_URI)
    .then(result => {
        console.log('Connected to MongoDB');
        app.listen(8080);
    }).catch(err => {
        console.log('Error connecting to MongoDB:', err.message);
    })
