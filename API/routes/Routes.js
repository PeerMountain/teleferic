'use strict';
module.exports = function(app) {
	var userController = require('../controllers/UserController');
	var keyController = require('../controllers/KeyController');
	var invitationController = require('../controllers/InvitationController');
	var initializeController = require('../controllers/InitializeController');

	app.route('/users')
	.get(userController.list_all_users)
	.post(userController.create_a_user);

	app.route('/users/:userId')
	.get(userController.http_read_a_user)
	.put(userController.update_a_user) //TODO: do the checks
	.delete(userController.delete_a_user);

	app.route('/user_by_address/:address')
	.get(userController.read_a_user_by_address_http);

	app.route('/generateKey')
	.get(keyController.generateKeypair);

	app.route('/sign')
	.post(keyController.sign);
	
	app.route('/signCipher')
	.post(keyController.cifradoExternal);

	app.route('/verify')
	.post(keyController.httpVerify);

	app.route('/invitations')
	.get(invitationController.list_all_invitations)
	.post(invitationController.create_a_invitation);

	app.route('/invitations/:invitationId')
	.get(invitationController.http_read_a_invitation)
  	.put(invitationController.update_a_invitation)//TODO: do the checks
	.delete(invitationController.delete_a_invitation);

	app.route('/initializeDB')
	.post(initializeController.initializeDB);

};
