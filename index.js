var express = require('express');
var expressReactViews = require('express-react-views');
var React = require('react');
var passport = require('passport');
var session = require('express-session');
var googleStrategy = require('./src/passport/googleStrategy');

// routs
var auth = require('./src/express/routes/auth');
var api = require('./src/express/routes/api');
var def = require('./src/express/routes/default');

var app  = express();

passport.use(googleStrategy);

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
app.get('/', def);

app.listen(3000, function() {
    console.log('Gearz is running on port 3000');
});
