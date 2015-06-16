var express = require('express');
var React = require('react');
var Router = require('react-router');
var routes = require('./src/Routes');

var app  = express();

app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine({ jsx: { harmony: true } }));


app
    .use(express.static('./dist'))
    .use(function(req, res, next) {
    Router.run(routes, req.url, Handler => {
        let html = React.renderToString(<Handler />);
        res.send(html);
    });
})

app.listen(3000);