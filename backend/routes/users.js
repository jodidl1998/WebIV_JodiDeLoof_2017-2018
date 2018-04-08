const express = require("express");
const router = express.Router();
const passport = require('passport');

//jsonwebtoken
const jwt = require('jsonwebtoken');

//import user schema 
const User = require('../models/userSchema')

router.post("/register", function(req, res, next) {
    let newUser = new User({
        email: req.body.email,
        username : req.body.username,
        password: req.body.password,
    });

    User.addUser(newUser, function(err, user){
        if(err){
            res.json({ success: false, message: 'User was not registered'});
        }else{
            res.json({ success: true, message: 'user is registered'});
        } 
    });
});

router.post('/auth', function(req,res,next){
    res.send('authentication');
});

router.get('/profile', function(req,res,next){
    res.send('profiel');
});

module.exports = router;


