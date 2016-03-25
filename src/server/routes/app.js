var express = require('express');
var passport = require('passport');
import fs from 'fs';
require.extensions['.html'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

var router = express.Router();

router.route('/login').get((req, res) => {
    let wrap = require('../views/app.html')
        .replace(/\$\{cssBundlePath\}/g, '')
        .replace(/\$\{jsBundlePath\}/g, 'http://localhost:8081/assets/bundle.js');
    res.status(200).send(wrap);
});

router.route('*').get((req, res) => {
    if(!req.user) {
        res.redirect('/login');
    }
    else {
        let wrap = require('../views/app.html')
            .replace(/\$\{cssBundlePath\}/g, '')
            .replace(/\$\{jsBundlePath\}/g, 'http://localhost:8081/assets/bundle.js');
        res.status(200).send(wrap);
    }
});

module.exports = router;
