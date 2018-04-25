var express = require("express");
var router = express.Router();
let mongoose = require("mongoose");
let Deadline = mongoose.model("Deadline");
let Classroom = mongoose.model("Classroom");
let User = mongoose.model("User");
let passport = require("passport");
let jwt = require("express-jwt");

let auth = jwt({
  secret: "1234"
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
      res.json(classroom);
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

router.delete("/API/removeDeadline/:recipe", auth, function(req, res, next) {
  req.Deadline.remove(function(err) {
    if (err) {
      return next(err);
    }
    res.json(req.Deadline);
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

module.exports = router;