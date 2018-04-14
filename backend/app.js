const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');

//routes
const articles = require('./routes/articles');
const users = require('./routes/users');

var app = express();

const PORT = 3000;

//connectie met mongodb
mongoose.connect('mongodb://localhost:27017/happynews');
mongoose.connection.on('connected', function () {
    console.log("mongodb is framblij")
});
mongoose.connection.on('error', function () {
    console.log("mongodb is framboos")
});

//set static folder
app.use(express.static(path.join(__dirname, '../frontend')));

//middelware
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

//passport configuratie
require('./config/passportConf')(passport);

//route
app.use('/articles',articles);
app.use('/users', users);

app.listen(PORT, function(){
    console.log('server is framblij');
});