var express = require('express');
var passport = require('passport');

var router = express.Router();

router.route('*').get(function(req, res) {
    res.send('API');
});

module.exports = router;
