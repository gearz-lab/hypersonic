var express = require('express');
var app = express();

app.set('views', './src/express-react-views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());
app.use(express.static('./dist'));


app.get('/api/*', function(req, res) {
   res.send('API');
});

app.get('/*', function(req, res) {
    res.render('layout', { data: { }});
});

app.listen(3000, function() {
    console.log('listeing on port 3000');
})