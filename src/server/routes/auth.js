var express = require('express');
var passport = require('passport');

var router = express.Router();

router.route('/google/callback').get(passport.authenticate('google', {
    failureRedirect: '/error'
}), function(req, res) {
    // this is a hack, I'm storing this value just so I can obtain it back
    // in my own connect-middleware on every request
    req.session.userId = req.user;
    res.redirect('/index');
});

router.route('/google').get(passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email']
}));

module.exports = router;
