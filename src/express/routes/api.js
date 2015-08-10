var express = require('express');
var passport = require('passport');
var usersApi = require('./apis/usersServerApi');
var mainMenuApi = require('./apis/mainMenuServerApi');

var router = express.Router();

usersApi.setup(router);
mainMenuApi.setup(router);

module.exports = router;
