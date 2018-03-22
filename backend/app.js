const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const route = require('./route');

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

//middelware
app.use(cors());
app.use(bodyParser.json());

//route
app.use('/',route);

app.listen(PORT, function(){
    console.log('server is framblij');
});