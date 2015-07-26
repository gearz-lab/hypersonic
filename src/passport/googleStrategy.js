var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var UserGoogleDal = require('../lib/dal/UserGoogleDal');

var users = new UserGoogleDal();

module.exports = new GoogleStrategy(
    {
        clientID: '825114884884-p0u14nm266brkoh3in70ohiqv47on063.apps.googleusercontent.com',
        clientSecret: 'rilPqu9oV3a5dnVIrIOtbAj3',
        callbackURL: 'http://localhost:3000/auth/google/callback'
    },
    function(accessToken, refreshToken, profile, done) {
        users.findOrCreateFromGoogleProfile()


        console.log(profile);
        done(null, profile);
    }
);