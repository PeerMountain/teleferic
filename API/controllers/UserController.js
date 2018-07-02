'use strict';
var mongoose = require('mongoose'),
User = mongoose.model('Users'),
keyController = require('./KeyController'),
invitationController = require('./InvitationController');
const crypto = require('crypto');



function list_all_users(req, res) {
 User.find({}, function(err, user) {
   if (err)
     res.send(err);
   res.json(user);
 });
};

function create_a_user(req, res) {

  console.log("Creating user...");
  var new_user = new User(req.body.message);
  invitationController.read_a_invitation(new_user.invitationID).then((invitation) => {
    (async() => {
      console.log(invitation);
      if(invitation == null||invitation.Error != undefined){
        res.status(404);
        console.log("Error no invitation with that ID found.");
        res.json({"Error" : "no invitation with that ID found."});
      }else{
        var user = await read_a_user_by_address_local(invitation.invitationSender);
        var verificationResult = keyController.verifyExternal(req.body.message, req.body.message.publicKey, req.body.signature);
        if(verificationResult.verified){
          if(req.body.pass == invitation.pass){
            var hash = crypto.createHash('sha256');
            hash.update(req.body.message.address+user[0].cipherKey);
            console.log(invitation.pass)
            console.log(req.body.message.address+user[0].cipherKey)
            if(hash.digest('hex') == invitation.pass){
              if(invitation.enabled){
                new_user.save(function(err, user) {
                  if (err){
                    res.status(500);
                    console.log("Error saving user");
                    err.Error = "Error saving user";
                    res.send(err);
                  }else{
                    res.status(200);
                    invitationController.update_a_invitation_disabled(invitation._id);
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
              console.log("Error the invitation is not for this address.");
              res.json({"Error" : "the invitation is not for this address."});
            }
          }else{
            res.status(406);
            console.log("Error pass proof not successful.");
            res.json({"Error" : "pass proof not successful."});
          }
        }else{
          res.status(406);
          console.log("Error signature did not match.");
          res.json({"Error" : "signature did not match."});
        }}
      })();
    });
};


function http_read_a_user(req, res) {
 User.findById(req.params.userId, function(err, user) {
   if (err){
     res.status(500);
     res.send(err);
   }
   res.status(200);
   res.json(user);
 });
};

function read_a_user_by_address_http(req, res) {
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

function read_a_user_by_address(address) {
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
async function read_a_user_by_address_local (address) {
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

function update_a_user(req, res) {
 User.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true}, function(err, user) {
   if (err)
     res.send(err);
   res.json(user);
 });
};

function delete_a_user(req, res) {
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

function create_first_user(user) {
  return new Promise( ( resolve, reject ) => {
    console.log("Creating user...");
    var new_user = new User(user);
    new_user.save(function(err, user) {
      if (err){
        console.log("Error saving first user, likely user has already been generated");
        err.Error = "Error saving first user, likely user has already been generated";
        reject(err);
        resolve(err);
      }else{
        console.log("User created");
        resolve(user);
      }
    });
  });
};

module.exports.list_all_users = list_all_users;
module.exports.create_a_user = create_a_user;
module.exports.http_read_a_user = http_read_a_user;
module.exports.read_a_user_by_address = read_a_user_by_address;
module.exports.update_a_user = update_a_user;
module.exports.delete_a_user = delete_a_user;
module.exports.create_first_user = create_first_user;
module.exports.read_a_user_by_address_http = read_a_user_by_address_http;
