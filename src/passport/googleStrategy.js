var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var UserDal = require('../lib/dal/UserDal');

var users = new UserDal();

module.exports = new GoogleStrategy(
    {
        clientID: '825114884884-p0u14nm266brkoh3in70ohiqv47on063.apps.googleusercontent.com',
        clientSecret: 'rilPqu9oV3a5dnVIrIOtbAj3',
        callbackURL: 'http://localhost:3000/auth/google/callback'
    },
    function(accessToken, refreshToken, profile, done) {



        console.log(profile);
        done(null, profile);
    }
);