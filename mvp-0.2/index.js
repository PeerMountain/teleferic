var express = require('express'),
	
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  User = require('./api/models/UserModel'), //created model loading here
  Invitation = require('./api/models/InvitationModel'), //created model loading here

  bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/TelefericDB'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/Routes.js'); //importing route
routes(app); //register the route


app.listen(port);


console.log('Teleferic RESTful API server started on: ' + port);

