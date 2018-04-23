var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let Deadline = mongoose.model('Deadline');
let jwt = require('express-jwt');

let auth = jwt({
  secret: "1234"
});

router.post('/API/addDeadline/',auth, function(req, res, next) {

  let deadline = new Deadline(req.body);

  deadline.save(function(err, dl){
    //if error ga naar volgende midleware en pass error
    if(err) { return next(err); }
    res.json(dl);
  });  
});

router.get('/API/getDeadlines',auth, function(req,res,next){
  Deadline.find(function(err, deadline){
    if(err) { return next(err); }
    res.json(deadline);
  });
});

router.get('/API/countDeadlines',auth, function(req,res,next){
  
  Deadline.find(function(err, response){
    if(err){return next(err); }
    res.json({count: response.length})
  });

});

router.delete('/API/removeDeadline/:recipe',auth, function(req,res,next){
  req.Deadline.remove(function(err){
    if(err){ return next(err); }
    res.json(req.Deadline);
  });
});

module.exports = router;