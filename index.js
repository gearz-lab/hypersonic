var util = require('util');

var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');

var expressReactViews = require('express-react-views');
var passport = require('passport');
var googleStrategy = require('./src/server/passport/googleStrategy');

var db = require('./src/server/lib/database/dbHelper');
var UserDal = require('./src/server/lib/dal/UserDal');

var app  = express();
var users = new UserDal();

app.set('views', './src/server/views');
app.set('view engine', 'jsx');
app.engine('jsx', expressReactViews.createEngine({ beautify: true }));

passport.serializeUser(function(userId, done) {
    done(null, userId);
});

passport.deserializeUser(function(userId, done) {

    db.connect(function(error, connection) {
        if(error) {
            done(error);
        }
        else {
            users.find(connection, userId, function (error, user) {
                connection.close();
                done(null, user);
            });
        }
    });
});

app.use(express.static('./dist'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use( bodyParser.urlencoded({
    extended: true
}));
app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(googleStrategy);

// routes
var auth = require('./src/server/routes/auth');
var api = require('./src/server/routes/api');
var def = require('./src/server/routes/app');
app.use('/auth', auth);
app.use('/api', api);
app.get('*', def);

app.listen(3000, function() {
    console.log('Gearz is running on port 3000');
});
