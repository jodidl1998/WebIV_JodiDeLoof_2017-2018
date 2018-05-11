var express = require("express");
var router = express.Router();
let mongoose = require("mongoose");
let Deadline = mongoose.model("Deadline");
let Classroom = mongoose.model("Classroom");
let User = mongoose.model("User");
let passport = require("passport");
let jwt = require("express-jwt");

let auth = jwt({
  secret: process.env.RECIPE_BACKEND_SECRET
});

router.post("/API/addDeadline/", auth, function(req, res, next) {
  let deadline = new Deadline(req.body);

  deadline.save(function(err, dl) {
    //if error ga naar volgende midleware en pass error
    if (err) {
      return next(err);
    }
    res.json(dl);
  });
});

router.get("/API/getDeadlines/:classroom", auth, function(req, res, next) {
  Deadline.find({classroom:req.params.classroom},function(err, deadline) {
    if (err) {
      return next(err);
    }
    res.json(deadline);
  });
});

router.get("/API/getClassroom/:username", auth, function(req,res,next){
  let username = req.params.username;
  User.findOne({'username':username}, function(err, user){
    if(err){next(err);}
    Classroom.findOne({_id:user.classroom}, function(err, classroom){
      if(err){next(err);}
      if(classroom === null){
        res.json();
      }else{
        res.json(classroom);
      }
      
      
    });
  });
});

router.get("/API/countDeadlines", auth, function(req, res, next) {
  Deadline.find(function(err, response) {
    if (err) {
      return next(err);
    }
    res.json({ count: response.length });
  });
});

router.delete("/API/removeDeadline/:dlId", auth, function(req, res, next) {
  Deadline.remove({_id:req.params.dlId}, function(err,dl){
    if(err){next(err);}
    res.json(dl);
  });
});

router.post("/API/addClassroom", auth, function(req, res, next) {
  let classroom = new Classroom(req.body);
  classroom.save(function(err, room) {
    if (err) {
      return next(err);
    }
    res.json(room);
  });
});

router.post("/API/editDeadline", auth, function(req, res, next) {
  Deadline.findOneAndUpdate(
    {_id: req.body.id},
    { $set: { 
      "vak": req.body.vak,
      "date": req.body.date,
      "beschrijving": req.body.beschrijving,
      "procent": req.body.procent 
    } },
    function(err, dl){
      if(err) { next(err); }
      res.json(dl);
    });
});

router.post("/API/joinClassroom", auth, function(req, res, next) {
  User.findOneAndUpdate(
    { username: req.body.username },

    { $set: { "classroom": req.body.classroomId } },

    function(err, obj) {
      if (err) {
        return next("err");
      }
      res.json(obj);
    }
  );
});

router.post('/API/leaveClassroom',auth, function(req,res,next){
  User.findOneAndUpdate(
    { username: req.body.username },

    { $set: { "classroom": null } },

    function(err, obj) {
      if (err) {
        return next("err");
      }
      res.json(obj);
    }
  );
});

router.get('/API/idFromCode/:code', auth, function(req,res,next){
  Classroom.findOne({classroomCode:req.params.code}, function(err, classroom){
    if(err){next(err);}
    res.json(classroom);
  });
});

module.exports = router;