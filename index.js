var baber_require = require('./register-babel');

var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var expressReactViews = require('express-react-views');
var React = require('react');
var passport = require('passport');
var googleStrategy = require('./src/passport/googleStrategy');

var db = require('./src/lib/database/dbHelper');
var UserDal = require('./src/lib/dal/UserDal');

// routes
var auth = require('./src/express/routes/auth');
var api = require('./src/express/routes/api');
var def = require('./src/express/routes/app');

var app  = express();
var users = new UserDal();

passport.use(googleStrategy);

app.set('views', './src/express/views');
app.set('view engine', 'jsx');
app.engine('jsx', expressReactViews.createEngine({ beautify: true }));

app.use(cookieParser());
app.use(bodyParser());
app.use(session({secret: 'keyboard cat'}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
passport.deserializeUser(function(user, done) {
    db.connect(function(error, connection) {
        if(error) {
            done(error);
        }
        else {
            users.find(connection, id, function (user) {
                connection.close();
                done(null, user);
            });
        }
    });
});

app.use(express.static('./dist'));

app.use('/auth', auth);
app.use('/api', api);
app.get('*', def);

app.listen(3000, function() {
    console.log('Gearz is running on port 3000');
});
