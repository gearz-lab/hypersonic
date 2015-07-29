var express = require('express');
var passport = require('passport');

var router = express.Router();

router.route('/login').get((req, res) => {
    res.render('app.jsx');
})

router.route('*').get((req, res) => {
    if(!req.user) {
        res.redirect('/login');
    }
    else {
        res.render('app.jsx');
    }
});

module.exports = router;
