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
      if(req.body.pass == invitation.pass){
        if(invitation.enabled){
          new_user.save(function(err, user) {
            if (err){
              res.status(500);
              console.log("Error saving user");
              err.Error = "Error saving user";
              res.send(err);
            }else{
              res.status(200);
              invitationController.update_a_invitation_disabled(invitation.invitationSender);
              console.log("User created");
              res.json(user);
            }
          });
        }else{
          res.status(406);
          console.log("Error the invitation is not enabled.");
          res.json({"Error" : "the invitation is not enabled."});
        }
      }else{
        res.status(406);
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

exports.read_a_user_by_address_http = function(req, res) {
console.log('entered func');
 User.find({address : req.params.address}, function(err, user) {
   console.log('entered');
   if (err){
     res.status(500);
     console.log('error reading user by address');
     res.send(err);
   }
   res.status(200);
   console.log('resturning user');
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
};

exports.create_first_user = function() {
  return new Promise( ( resolve, reject ) => {
    console.log("Creating user...");
    var new_user = new User({
  		"name": "admin",
  		"address": "0x0ad92B0Cfd5E7D4638c94546883fd03254a01AE7",
  		"publicKey": "-----BEGIN CERTIFICATE-----\nMIIDPjCCAiYCCQDjPaj4hdeMFTANBgkqhkiG9w0BAQsFADBhMQswCQYDVQQGEwJlczELMAkGA1UECAwCbWExCzAJBgNVBAcMAm1hMQswCQYDVQQKDAJhbDELMAkGA1UECwwCYWwxCzAJBgNVBAMMAmFsMREwDwYJKoZIhvcNAQkBFgJhbDAeFw0xODA2MTkxNzE2NTFaFw0xOTA2MTkxNzE2NTFaMGExCzAJBgNVBAYTAmVzMQswCQYDVQQIDAJtYTELMAkGA1UEBwwCbWExCzAJBgNVBAoMAmFsMQswCQYDVQQLDAJhbDELMAkGA1UEAwwCYWwxETAPBgkqhkiG9w0BCQEWAmFsMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwB7hN2IiIdkftt+oJvNzSpwH2RwzsEbknaqCH8/BRZWIoH/1d6vIFi0Uvi6eAuR1PhNBwlz6zRJ/I9zpxFReS3FEqCvdSH7jV11lize4c/mKJMMTYx5EnsjVznsX1pyAL3o2Lrv4FwxDQ1eEyRfW6oeldHtNq4W6a7IVThKblcFBSDqYEZd+0ivYI1ahlnSg/wOOXrxmCT+pnMVJy+KiYmg7uV7dxnA83gkRNzf1NCj7DndgoCwX4RdeHMx7w+qAig0bIelw9VQmfnDW0Lu9hBXiEgkQFuFc3qA7616m8j4ZS6SJptDyUNpMLgAnB8B6+qjGgS+X86t0/imEs2CkLQIDAQABMA0GCSqGSIb3DQEBCwUAA4IBAQBWJoeQ9uhuewNZm4jweOGzJ/QYx2h5jpBrka0f1Bd5mTxcqB9J/IjkeCjK9Qo2wffQVLxa9jW9/Q8eqUdvqhbRluyQupvJeifs2B710nZgAEp5VcpaSJNhj4YQIaw640f5FLHu4Rt8POezHwvSuGedalFXsQO/PJV3IKg6OpNZyLhT2c0H2NqOHJmnV3ltU4jR2aVU/lWLCvH0Lzlb3R/NAUvqgvDTugUkt2WoV+7sw57rEhNI4r5v4FEd1cbSOFu2Xnfk2Upgz5wswdkF8faZQR4LyDj4ZlCD5RSjaHaMLXJe7CZU33zHwaUbig+fPW4JYrDq7HZHT7i2+KsNLMil\n-----END CERTIFICATE-----",
  		"cipherKey": "bobcipherKey",
  		"email": "bob@mail.com",
  		"invitationID": "0"
  	});
    new_user.save(function(err, user) {
      if (err){
        console.log("Error saving first user, likely user has already been generated");
        err.Error = "Error saving first user, likely user has already been generated";
        reject(err);
        resolve(err);
      }else{
        invitationController.update_a_invitation_disabled(invitation[0].invitationSender);
        console.log("User created");
        resolve(user);
      }
    });
  });
};
