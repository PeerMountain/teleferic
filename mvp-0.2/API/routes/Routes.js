'use strict';
module.exports = function(app) {
	var userController = require('../controllers/UserController');
	var keyController = require('../controllers/KeyController');
	var invitationController = require('../controllers/InvitationController');

	app.route('/users')
	.get(userController.list_all_users)
	.post(userController.create_a_user);

	app.route('/users/:userId')
	.get(userController.read_a_user)
	.put(userController.update_a_user)
	.delete(userController.delete_a_user);

	app.route('/user_by_pk/:userId')
	.get(userController.read_a_user_by_pk);


	app.route('/generateKey')
	.get(keyController.generateKeypair);

	app.route('/sign')
	.post(keyController.sign);
	

	app.route('/verify')
	.post(keyController.httpVerify);

	app.route('/invitations')
	.get(invitationController.list_all_invitations)
	.post(invitationController.create_a_invitation);

	app.route('/invitations/:invitationId')
	.get(invitationController.read_a_invitation)
	.put(invitationController.update_a_invitation)
	.delete(invitationController.delete_a_invitation);

};