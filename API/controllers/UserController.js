'use strict';
var mongoose = require('mongoose'),
User = mongoose.model('Users'),
keyController = require('./KeyController'),
invitationController = require('./InvitationController');

exports.list_all_users = function(req, res) {
 User.find({}, function(err, user) {
   if (err)
     res.send(err);
   res.json(user);
 });
};

exports.create_a_user = function(req, res) {
  console.log("Creating user...");
  var new_user = new User(req.body.message);
  invitationController.read_a_invitation(new_user.invitationID).then((invitation) => {
    var verificationResult = keyController.verifyExternal(req.body.message, req.body.message.publicKey, req.body.signature);
    if(verificationResult.verified){
      if(req.body.pass == invitation[0].pass){
        if(invitation[0].enabled){
          new_user.save(function(err, user) {
            if (err){
              res.status(500);
              console.log("Error saving user");
              err.Error = "Error saving user";
              res.send(err);
            }else{
              res.status(200);
              invitationController.update_a_invitation_disabled(invitation[0].invitationSender);
              console.log("User created");
              res.json(user);
            }
          });
        }else{
          res.status(418);
          console.log("Error the invitation is not enabled.");
          res.json({"Error" : "the invitation is not enabled."});
        }
      }else{
        res.status(418);
        console.log("Error pass prove not successful.");
        res.json({"Error" : "pass prove not successful."});
      }
    }else{
      res.status(406);
      console.log("Error signature did not match.");
      res.json({"Error" : "signature did not match."});
    }
  });
};

exports.http_read_a_user = function(req, res) {
 User.findById(req.params.userId, function(err, user) {
   if (err){
     res.status(500);
     res.send(err);
   }
   res.status(200);
   res.json(user);
 });
};

exports.read_a_user_by_pk = function(req, res) {
 User.find({publicKey : req.params.userId}, function(err, user) {
   if (err)
     res.send(err);
   res.json(user);
 });
};

exports.read_a_user_by_address = function(address) {
  return new Promise( ( resolve, reject ) => {
   User.find({address : address}, function(err, user) {
     if (err){
       err.Error = "Error finding user";
       resolve(err);
     }else{
       resolve(user);
     }
   });
 });
};

exports.update_a_user = function(req, res) {
 User.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true}, function(err, user) {
   if (err)
     res.send(err);
   res.json(user);
 });
};

exports.delete_a_user = function(req, res) {
 User.remove({
   _id: req.params.userId
 }, function(err, user) {
   if (err){
     res.status(500);
     res.send(err);
   }
   res.status(200);
   res.json({ message: 'User successfully deleted' });
 });
