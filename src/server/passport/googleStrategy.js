var GoogleStrategy = require('passport-google-oauth2').Strategy;
var UserGoogleDal = require('../../lib/dal/UserGoogleDal');
var db = require('../../lib/database/dbHelper');

var users = new UserGoogleDal();

    module.exports = new GoogleStrategy(
        {
            clientID: '825114884884-p0u14nm266brkoh3in70ohiqv47on063.apps.googleusercontent.com',
            clientSecret: 'rilPqu9oV3a5dnVIrIOtbAj3',
            callbackURL: 'http://localhost:3000/auth/google/callback'
        },
        function(accessToken, refreshToken, profile, done) {
            db.connect((error, connection) => {
                if(error) {
                    done(error);
                }
                else {
                    users.findOrCreateFromGoogleProfile(connection, profile, (error, user) => {
                        connection.close();
                        done(error, user.id);
                    });
                }
            });
        }
    );