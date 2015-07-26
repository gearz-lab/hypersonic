var express = require('express');
var passport = require('passport');

var router = express.Router();

router.route('**').get(function(req, res){
    if(!req.user) {
        res.redirect('/login');
    }
    else {
        res.render('layout.jsx');
    }
});

module.exports = router;
