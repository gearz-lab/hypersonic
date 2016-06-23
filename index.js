var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
var colors = require('colors');
var setupAppConfig = require('./src/common/lib/helpers/appConfigHelper');
var DataContext = require('./src/server/lib/database/DataContext');
var dbUtils = require('./src/server/lib/database/dbUtils');
var expressReactViews = require('express-react-views');
var passport = require('passport');
var setupGoogleStrategy = require('./src/server/passport/googleStrategy');
var webpack = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var webpackConfig = require('./webpack.config.dev');

var appConfig = setupAppConfig(require('./app/appConfig'));

var dataContext = new DataContext(appConfig);

var app = express();
app.set('views', './src/server/views');
app.set('view engine', 'jsx');
app.engine('jsx', expressReactViews.createEngine({beautify: true}));

var webpackCompiler = webpack(webpackConfig);

passport.serializeUser(function (userId, done) {
    done(null, userId);
});

passport.deserializeUser(function (userId, done) {
    let repo = dataContext.getRepository('user');
    repo.load({id: userId})
        .then(u => done(null, u))
        .catch(done);
});
passport.use(setupGoogleStrategy(dataContext));

app.use(webpackMiddleware(webpackCompiler));
app.use(webpackHotMiddleware(webpackCompiler));
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
app.use('/api', setupApi(appConfig, dataContext));
app.get('*', def);

app.listen(3000, function () {
    console.log(colors.green(`Hypersonic is running on port 3000. NODE_ENV: ${process.env.NODE_ENV}`));
});
