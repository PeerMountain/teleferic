'use strict';
var mongoose = require('mongoose'),
Invitation = mongoose.model('Invitations'),
invitationController = require('./InvitationController'),
User = mongoose.model('Users'),
userController = require('./UserController');

exports.initializeDB = function(req, res) {
  userController.create_first_user().then((user) => {
    invitationController.create_first_invitation().then((invitation) => {
      res.json(user.merge(invitation));
    });
  }).catch((error) => {
    res.status(406);
    res.json(error);
  });
}
