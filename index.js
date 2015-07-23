var express = require('express');
var expressReactViews = require('express-react-views');
var React = require('react');
var passport = require('passport');
var session = require('express-session');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// routs
var auth = require('./src/express/routes/auth');
var api = require('./src/express/routes/api');
var def = require('./src/express/routes/default');

var app  = express();

passport.use(new GoogleStrategy(
    {
        clientID: '825114884884-p0u14nm266brkoh3in70ohiqv47on063.apps.googleusercontent.com',
        clientSecret: 'rilPqu9oV3a5dnVIrIOtbAj3',
        callbackURL: 'http://localhost:3000/auth/google/callback'
    },
    function(req, accessToken, refreshToken, profile, done) {
        done(null, profile);
    }
));

app.set('views', './src/express/views');
app.set('view engine', 'jsx');
app.engine('jsx', expressReactViews.createEngine({ beautify: true }));

app.use(session({secret: 'anything'}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(user, done) {
   done(null, user);
});

app.use(express.static('./dist'));

app.use('/auth', auth);
app.use('/api', api);
app.get('/**', def);

app.listen(3000, function() {
    console.log('Gearz is running on port 3000');
});
