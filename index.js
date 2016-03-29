var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
var colors = require('colors');
var Db = require('./src/server/lib/database/db');
var dbUtils = require('./src/server/lib/database/dbUtils');
var expressReactViews = require('express-react-views');
var passport = require('passport');
var setupGoogleStrategy = require('./src/server/passport/googleStrategy');

var appConfig = require('./app/appConfig');
var db = new Db(appConfig);

var app = express();
app.set('views', './src/server/views');
app.set('view engine', 'jsx');
app.engine('jsx', expressReactViews.createEngine({beautify: true}));

passport.serializeUser(function (userId, done) {
    done(null, userId);
});

passport.deserializeUser(function (userId, done) {
    let repo = db.getRepository('user');
    repo.load({id: userId})
        .then(u => done(null, u))
        .catch(done);
});
passport.use(setupGoogleStrategy(db));

app.use(express.static('./dist'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
}));
app.use(passport.initialize());
app.use(passport.session());


// routes
var auth = require('./src/server/routes/auth');
var def = require('./src/server/routes/app');
var setupApi = require('./src/server/routes/api');

app.use('/auth', auth);
app.use('/api', setupApi(appConfig, db));
app.get('*', def);

app.listen(3000, function () {
    console.log(colors.green(`Gearz is running on port 3000. NODE_ENV: ${process.env.NODE_ENV}`));
});
