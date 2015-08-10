var express = require('express');
var passport = require('passport');
var usersApi = require('./apis/usersServerApi');
var mainMenuApi = require('./apis/mainMenuServerApi');

var router = express.Router();

usersApi.setup(router);
mainMenuApi.setup(router);

router.route('*').get(function(req, res) {
    //res.contentType('application/json');
    res.send('API is wortking');
});

module.exports = router;
