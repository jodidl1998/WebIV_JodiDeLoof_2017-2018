const jwtStrategy = require('passport-jwt').Strategy;

const ExtractJwt = require('passport-jwt').ExtractJwt;
const constants = require('../config/constants');
const User = require('../models/userSchema');

module.exports = function(passport){
    let options = {};
    options.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    options.secretOrKey = constants.encryption_key;
    passport.use(new jwtStrategy(options, function(jwt_payload, done){
        User.getUserById(jwt_payload._id, function(err, user){
            if(err){
                return done(err,false);
            }

            if(user){
                return done(null, user);
            }else{
                return done(null, false);
            }
        });
    }));
}