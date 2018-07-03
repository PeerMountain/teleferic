# Teleferic

KYC3's abstraction layer to interact with Peermountain's DAPP via http requests, can provide authentication, onboarding invitation, requesting attestations, and checking they have been stored in blockchain

DISCLAIMER: most of this code has functions to accelerate development and testing which will be disabled on production

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Requirements you need to install beforehand

* [Node 8+](https://nodejs.org/en/download/) - JavaScript runtime built on Chrome's V8 JavaScript engine.
* [NPM](https://www.npmjs.com/get-npm) - Package manager for JavaScript
* [MongoDB](https://www.mongodb.com/download-center?#enterprise) - NonSQL database (Others can be used if controllers adapted)


### Installing

Only node dependencies have to be installed, we'll use NPM for that.

```
npm install
```

To start it, we need to start a MongoDB instance, and configure the connection URI in config.json can either do it from node or with the npm script inside package.json

```
npm start
```

For testing purposes, you can initialize the DB by sending an empty post petition to serveruri/initializeDB, it will create an invitation and an admin user using the keys in the /API/certs folder, THIS CANNOT BE USED IN PRODUCTION, THE FUNCTION IS DISABLED.


## Deployment

To deploy on a live system:

Configure the connection URI in config.json.
Start the program as a daemon with
```
npm startDaemon
```


## Endpoints

Please read the swagger [swagger file](https://github.com/PeerMountain/teleferic/blob/mvp-0.2/API/definition/Teleferic_Swagger.json) for details on the endpoints and how to interact with them.

A postman collection is also provided [here](https://github.com/PeerMountain/teleferic/blob/mvp-0.2/API/definition/Teleferic_postman_collection.json) with examples for all petitions.


## Authors

* **Alicia Lombarte** - [AliciaLombarte](https://github.com/AliciaLombarte)
* **Enrique Alcázar** - [kikoncuo](https://github.com/kikoncuo)
* **Nacho Althabe** - [nachoalthabe](https://github.com/nachoalthabe)


See also the list of [contributors](https://github.com/PeerMountain/teleferic/graphs/contributors) who participated in this project.

## Acknowledgments

* Hat tip to anyone whose code was used
