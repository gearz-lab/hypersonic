var express = require('express');
var passport = require('passport');

var router = express.Router();

// /auth/authenticate
router.route('/authenticate').get(function(req, res) {
  var authCookie = {};
  authCookie.isAuthenticated = req.user != undefined;
  if(authCookie.isAuthenticated) {
    authCookie.user = {
      name: req.user.displayName,
      image: req.user._json.image.url
    }
    res.cookie('gearz.auth', JSON.stringify(authCookie), { maxAge: 9000000, httpOnly: false });
  }
  res.redirect('/');
});

router.route('/google/callback').get(passport.authenticate('google', {
    successRedirect: '/auth/authenticate',
    failure: '/error'
}));

router.route('/google').get(passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email']
}));

module.exports = router;
