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
        description: "empty",
        picture: "/test"
    });

    User.addUser(newUser, function(err, user){
        if(err){
            res.json({ success: false, message: err});
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

router.get('/profile', function(req,res,next){
    _username = req.query.username;
    User.getUserByUsername(_username, function(err, _user){
        if(!_user){
            return res.json({success: false, message: "user does not exists"});
        }else{
            return res.json({success: true, user: _user});
        }
    });
});


router.post('/update',passport.authenticate('jwt',{session: false}), function(req,res,next){
    const _email = req.body.email;
    const _username = req.body.username;
    const _description = req.body.description;
    const _picture = req.body.picture;

    let changed_user = {
        email : _email,
        username : _username,
        description : _description,
        picture : _picture
    }

    User.getUserByUsername(_username, function(err, user){
        if(!user){
            return res.json({success: false, message: "user does nt exists"});
        }else{
            User.updateUser(user, changed_user, function(err, user){
                if(err){
                    return res.json({success: false, message: "probleem bij updaten van user"});
                }else{
                    return res.json({success: true, message: "user is geupdate"});
                }
            });
        }
    });

    
    
});

module.exports = router;


