var express = require('express');
var passport = require('passport');

var usersServerApi = require('./api/usersServerApi');
var mainMenuServerApi = require('./api/mainMenuServerApi');
var applicationDomainServerApi = require('./api/applicationDomainServerApi');
var entityServerApi = require('./api/entityServerApi');

var router = express.Router();

usersServerApi.setup(router);
mainMenuServerApi.setup(router);
applicationDomainServerApi.setup(router);
entityServerApi.setup(router);

module.exports = router;
