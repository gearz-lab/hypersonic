/* eslint no-var: 0 */
require("babel-register");
process.env.NODE_ENV = 'production';
var config = require('./webpack/webpack.config.prod.js');
module.exports = config;
