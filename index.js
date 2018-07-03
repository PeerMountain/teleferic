var express = require('express'),
  config = require("./config.json")
  app = express(),
  port = process.env.PORT || 3001,
  mongoose = require('mongoose'),
  User = require('./api/models/UserModel'), //created model loading here
  Invitation = require('./api/models/InvitationModel'), //created model loading here

  bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost/TelefericDB');
mongoose.connect(config.mongoDBURI, (err, db) => {
    if (err) {
        console.log('Error connecting to mongodb: ', err.message);
				process.exit(1);
    }
    else { console.log('DB connection successful')}
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/Routes.js'); //importing route
routes(app); //register the route


app.listen(port);


console.log('Teleferic RESTful API server started on: ' + port);
