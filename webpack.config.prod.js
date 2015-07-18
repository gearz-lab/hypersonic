/* eslint no-var: 0 */
require('./register-babel');
process.env.NODE_ENV = 'production';
var config = require('./webpack/webpack.config.prod.js');
module.exports = config;
