const express = require("express");
const router = express.Router();
const passport = require('passport');
const constants = require('../config/constants');

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
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, function(err, user){
        if(!user){
            return res.json({success: false, message: 'User does not exist'});
        }

        User.checkPassword(password, user.password, function(err, correct){
            if(correct){
                const token = jwt.sign(user.toJSON(), constants.encryption_key, {
                    expiresIn: 500000
                });

                res.json({
                    success: true,
                    token: 'JWT '+token,
                    user: {
                        id: user._id,
                        username: user.username,
                        email: user.email
                    }
                });
            }else{
                return res.json({success: false, message: 'Verkeerde wachtwoord'});
            }
        });
    });
});

router.get('/profile', passport.authenticate('jwt',{session: false}), function(req,res,next){
    res.json({user: req.user});
});

module.exports = router;


