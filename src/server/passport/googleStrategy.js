var GoogleStrategy = require('passport-google-oauth2').Strategy;

export default function setupGoogleStrategy(db) {
    return new GoogleStrategy(
        {
            clientID: '825114884884-p0u14nm266brkoh3in70ohiqv47on063.apps.googleusercontent.com',
            clientSecret: 'rilPqu9oV3a5dnVIrIOtbAj3',
            callbackURL: 'http://localhost:3000/auth/google/callback'
        },
        function (accessToken, refreshToken, profile, done) {
            let repo = db.getRepository('user');
            repo.findOrCreateFromGoogleProfile(profile)
                .then(u => done(null, u.id))
                .catch(done);
        }
    );
}