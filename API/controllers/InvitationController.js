'use strict';
var mongoose = require('mongoose'),
Invitation = mongoose.model('Invitations'),
keyController = require('./KeyController'),
userController = require('./UserController');

exports.list_all_invitations = function(req, res) {
 Invitation.find({}, function(err, invitation) {
   if (err)
     res.send(err);
   res.json(invitation);
 });
};

exports.create_a_invitation = function(req, res) {

  console.log("Creating an invitation...");
  var new_invitation = new Invitation(req.body.message);
  userController.read_a_user_by_address(req.body.address).then((verifyUser) => {
   if(verifyUser.Error == undefined && verifyUser.length > 0){
     var verificationResult = keyController.verifyExternal(req.body.message, verifyUser[0].publicKey, req.body.signature);

     if(verificationResult.verified){

      new_invitation.save(function(err, invitation) {
        if (err){
          res.status(500);
          console.log("Error creating invitation");
          err.Error = "Error creating invitation";
          res.send(err);
        }
        res.status(200);
        console.log("Invitation created");
        res.json(invitation);
      });
    }else{
      res.status(406);
      console.log("Error signature did not match.");
      res.json({"Error" : "signature did not match."});
    }
  }else{
    res.status(404);
    console.log("User does not exist");
    res.json({"Error" : "User does not exist"});
  }
});
};

exports.http_read_a_invitation = function(req, res) {
 Invitation.findById(req.params.invitationId, function(err, invitation) {
   if (err)
     res.send(err);
   res.json(invitation);
 });
};

exports.read_a_invitation = function(invitationID) {
  return new Promise( ( resolve, reject ) => {
   Invitation.find({invitationSender : invitationID}, function(err, invitation) {
     if (err){
       err.Error = "Error finding invitation";
       resolve(err);
     }else{
       resolve(invitation);
     }
   });
 });
};

exports.update_a_invitation_disabled = function(invitationID) {
 Invitation.findOneAndUpdate({invitationSender: invitationID}, {$set: {enabled : false}}, {new: true}, function(err, invitation) {
   if (err)
     return (err);
   return (invitation);
 });
};

exports.update_a_invitation = function(req, res) {
 Invitation.findOneAndUpdate({_id: req.params.invitationId}, req.body, {new: true}, function(err, invitation) {
   if (err)
     res.send(err);
   res.json(invitation);
 });
};

exports.delete_a_invitation = function(req, res) {
 Invitation.remove({
   _id: req.params.invitationId
 }, function(err, invitation) {
   if (err)
     res.send(err);
   res.json({ message: 'Invitation successfully deleted'});
 });
};
