var express = require('express');
var expressReactViews = require('express-react-views');
var React = require('react');

var app  = express();

app.set('views', './src/express/views');
app.set('view engine', 'jsx');
app.engine('jsx', expressReactViews.createEngine({ beautify: true }));


app.use(express.static('./dist'));

app.get('/api/*', function(req, res) {
    res.send('API');
});

app.get('/**', require('./src/express/routes').index);

app.listen(3000, function() {
    console.log('Gearz is running on port 3000');
});
