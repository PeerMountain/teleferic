'use strict';
const crypto = require('crypto');
const sign = crypto.createSign('RSA-SHA256');
const fs = require('fs');


exports.generateKeypair = function(req, res) {
	try{
		var keys = crypto.createDiffieHellman(2048);
		keys.generateKeys();
		res.json({
			"publicKey" : keys.getPublicKey("base64"),
			"privateKey" : keys.getPrivateKey("base64")
		});
	}
	catch(e){
		res.send(e);
	}	
};

exports.sign = function(req, res) {
	const signer = crypto.createSign('sha256');
	var message = req.body.message;
	if (typeof(message) != 'string') {
		message = JSON.stringify(message);
	}
	var hash = crypto.createHash('sha256');
	hash.update(message);
	signer.update(hash.digest('hex'));
	signer.end();

	const signature = signer.sign(req.body.privateKey);
	const signature_hex = signature.toString('hex');
	res.send(signature_hex);
};

exports.verifyExternal = function(message, publicKey, signature){
	return verify(message, publicKey, signature);
}
exports.httpVerify = function(req, res) {
	var result = verify(req.body.message, req.body.publicKey, req.body.signature );
	res.json(result);
};
function verify(message, publicKey, signature) {
	const verifier = crypto.createVerify('sha256');
	if (typeof(message) != 'string') {
		message = JSON.stringify(message);
	}
	var hash = crypto.createHash('sha256');
	hash.update(message);
	verifier.update(hash.digest('hex'));
	verifier.end();
	const verified = verifier.verify(publicKey, signature, 'hex');
	return{
		message: message,
		signature: signature,
		verified: verified,
	};
}