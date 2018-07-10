'use strict';
var mongoose = require('mongoose'),
Invitation = mongoose.model('Invitations'),
keyController = require('./KeyController'),
userController = require('./UserController');
const crypto = require('crypto');


exports.list_all_invitations = function(req, res) {
 Invitation.find({}, function(err, invitation) {
   if (err)
     res.send(err);
   res.json(invitation);
 });
};

exports.create_a_invitation = function(req, res) {
(async() => {
  console.log("Creating an invitation...");

  var receiver = req.body.message.invitationReceiver;
  var sender = await userController.read_a_user_by_address(req.body.message.invitationSender);
  var hash = crypto.createHash('sha256');
  var senderCipherKey = userController.decipher(sender[0].cipherKey);
  hash.update(receiver + senderCipherKey);
  console.log("hash(receiverAddress+senderCipherKey)"+receiver + senderCipherKey);

   if(sender.Error == undefined){
     var verificationResult = keyController.verifyExternal(req.body.message, sender[0].publicKey, req.body.signature);
     console.log  (verificationResult)
     if(verificationResult.verified){
      req.body.message.pass = hash.digest('hex');
      var new_invitation = new Invitation(req.body.message);
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
    console.log("User address does not exist");
    res.json({"Error" : "User address does not exist"});
  }
    })();
};

exports.http_read_a_invitation = function(req, res) {
 Invitation.findById(req.params.invitationId, function(err, invitation) {
   if (err){
     res.status(500);
     res.send(err);
   }
   res.status(200);
   res.json(invitation);
 });
};

exports.read_a_invitation = function(invitationID) {
  return new Promise( ( resolve, reject ) => {
   Invitation.findById(invitationID, function(err, invitation) {
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
 Invitation.findOneAndUpdate({_id: invitationID}, {$set: {enabled : false}}, {new: true}, function(err, invitation) {
   if (err)
     return (err);
   return (invitation);
 });
};

exports.update_a_invitation = function(req, res) {
 Invitation.findOneAndUpdate({_id: req.params.invitationId}, req.body, {new: true}, function(err, invitation) {
   if (err){
     res.send(err);
   }
   res.status(200);
   res.json(invitation);
 });
};

exports.delete_a_invitation = function(req, res) {
 Invitation.remove({
   _id: req.params.invitationId
 }, function(err, invitation) {
   if (err){
     res.status(500);
     res.send(err);
   }
   res.status(200);
   res.json({ message: 'Invitation successfully deleted'});
 });
};

exports.create_first_invitation = function() {
  return new Promise( ( resolve, reject ) => {
    var new_invitation = new Invitation({
            "expirationDate": 1561050357,
            "pass": "99b80c727abc1c40cc908d370f7031e54caf8793f7bbca42030bdf8de5e40ea0",
            "enabled": "true",
            "invitationSender": "0x0ad92B0Cfd5E7D4638c94546883fd03254a01AE7"
        });
     new_invitation.save(function(err, invitation) {
       if (err){
         resolve(err);
       }
       resolve(invitation);
     });
   });
};
