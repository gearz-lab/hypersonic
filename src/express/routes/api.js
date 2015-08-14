var express = require('express');
var passport = require('passport');
var usersApi = require('./api/usersServerApi');
var mainMenuApi = require('./api/mainMenuServerApi');
var applicationDomainApi = require('./api/applicationDomainServerApi');

var router = express.Router();

usersApi.setup(router);
mainMenuApi.setup(router);
applicationDomainApi.setup(router);

module.exports = router;
