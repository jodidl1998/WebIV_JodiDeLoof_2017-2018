const mongoose = require('mongoose');

//voor encryptie
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    picture:{
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
    const byUserNameQuery = {username : username }
    User.findOne(byUserNameQuery, callback);
}

//newUser methode: password wordt eerst gehashed endan pas toegevoegd
module.exports.addUser = function(user, callback){
    //10 staat voor het aantal "round" dat het password zal gehashed worden
    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(user.password, salt, function(err, hash){
            if(err){ throw err; }
            user.password = hash;

            //save naar database
            user.save(callback);
        });
    });
};

module.exports.checkPassword = function(password, hashed, callback){
    bcrypt.compare(password, hashed, function(err, correct){
        callback(null, correct);
    });
};

module.exports.updateUser = function(user, changed_user, callback){
    user.email = changed_user.email;
    user.username = changed_user.username;
    user.description = changed_user.description;
    user.picture = changed_user.picture;
    user.save(callback);
}