'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var inviteSchema = new Schema({
	expirationDate:  Number,
	pass: String,
	enabled: { type: Boolean, default: true },
	invitationSender: String 

});

module.exports = mongoose.model('Invitations', inviteSchema);