var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var Skill = require('../models/skill');

// Handles Ajax request for user information if user is authenticated
router.get('/:user', function(req, res) {
  Skill.find({user: req.params.user}, function (err, skills) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    res.send(skills);
  })

});

// clear all server session information about this user
router.get('/logout', function(req, res) {
  // Use passport's built-in method to log out the user
  console.log('Logged out');
  req.logOut();
  res.sendStatus(200);
});

//post new skill
router.post('/', function(req, res) {
  var skill = new Skill(req.body);
  skill.save(function (err) {
    if(err) {
      res.sendStatus(500);
      return;
    }
    console.log('saved!');
    res.sendStatus(201);
  })
});

router.delete('/:id', function (req, res) {
Skill.findByIdAndRemove(req.params.id, function (err) {
  if(err) {
    res.sendStatus(500);
    return;
  }
  res.sendStatus(204);
});
});

router.put('/:id', function (req, res) {
  Skill.findByIdAndUpdate(req.params.id, req.body, function (err, skill) {
    if (err) {
      res.sendStatus(500);
      return;
    }
    res.send(skill);
  });
});
module.exports = router;
