'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	name:  String,
	address: { type: String, unique : true},
	publicKey: String,
	cipherKey: String,
	email: String,
	invitationID: Number
});

module.exports = mongoose.model('Users', userSchema);