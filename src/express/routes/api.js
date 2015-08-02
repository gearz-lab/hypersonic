var express = require('express');
var passport = require('passport');
var usersApi = require('./apis/usersApi');

var router = express.Router();

usersApi.setup(router);

router.route('*').get(function(req, res) {
    //res.contentType('application/json');
    res.send('API is wortking');
});

module.exports = router;
